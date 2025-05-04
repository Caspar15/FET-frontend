document.addEventListener("DOMContentLoaded", () => {
  const API_BASE_URL = "https://744b-1-170-83-119.ngrok-free.app";
  const messageIcon = document.querySelector(".message-icon");
  const modal = document.querySelector(".modal");
  const closeButton = document.querySelector(".close-button");
  const contactForm = document.querySelector(".contact-form");
  const toast = document.querySelector(".toast");
  const testResultToast = document.querySelector(".test-result-toast");
  const errorToast = document.querySelector(".error-toast");

  // 定義偏好設置選項
  const preferenceOptions = [
    "preference1",
    "preference2",
    "preference3",
    // 可以根據實際需求添加更多選項
  ];

  // 打開彈出視窗
  messageIcon.addEventListener("click", () => {
    modal.classList.add("show");
    document.body.style.overflow = "hidden"; // 防止背景滾動
  });

  // 關閉彈出視窗函數
  const closeModal = () => {
    modal.classList.remove("show");
    document.body.style.overflow = "";
    contactForm.reset(); // 清空表單
  };

  // 顯示提示訊息函數
  const showToast = () => {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000); // 3秒後自動隱藏
  };

  // 顯示測驗結果函數
  const showTestResult = (success) => {
    testResultToast.classList.remove("success", "failure");
    testResultToast.classList.add(success ? "success" : "failure");
    testResultToast.querySelector(".toast-message").textContent = success
      ? "恭喜您通過測驗！"
      : "很抱歉，測驗未通過，請再接再厲。";
    testResultToast.classList.add("show");
    setTimeout(() => {
      testResultToast.classList.remove("show");
    }, 4000);
  };

  // 顯示錯誤訊息函數
  const showError = (message) => {
    errorToast.querySelector(".toast-message").textContent = message;
    errorToast.classList.add("show");
    setTimeout(() => {
      errorToast.classList.remove("show");
    }, 5000);
  };

  // 輪詢通話結果函數
  const pollForResults = async (callSid) => {
    if (!callSid) {
      console.error("No callSid provided for polling");
      return false;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/call-results/${callSid}`,
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Call Results:", result);

        // 顯示測試結果
        showTestResult(1);
        return true;
      }

      if (response.status === 404) {
        console.log("Results not yet available (404) - continuing polling");
        return false;
      }

      console.error("Error Response:", {
        status: response.status,
        statusText: response.statusText,
      });
      return false;
    } catch (error) {
      console.error("Network Error:", error);
      return false;
    }
  };

  // API 調用函數
  const makeCallTest = async (topic, button, preferences = []) => {
    try {
      button.classList.add("loading");

      // 先發送 update-system-message 請求
      const updateResponse = await fetch(
        `${API_BASE_URL}/update-system-message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({
            task: topic,
            company_name: "測試公司",
            extraction_preferences: preferences,
          }),
        }
      );

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json().catch(() => ({}));
        throw new Error(
          errorData.message || `系統訊息更新失敗 (${updateResponse.status})`
        );
      }

      const updateData = await updateResponse.json();
      console.log("Update System Message Response:", updateData);

      // 發送 make-call 請求
      const response = await fetch(`${API_BASE_URL}/make-call`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          phone: "+886971240546",
          company_name: "測試公司",
          task: topic,
          extraction_preferences: preferences,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `請求失敗 (${response.status})`);
      }

      const result = await response.json();
      console.log("Make Call Response:", result);

      // 開始輪詢通話結果
      if (result.callSid) {
        console.log("Starting polling for callSid:", result.callSid);
        const pollInterval = setInterval(async () => {
          const hasResults = await pollForResults(result.callSid);
          if (hasResults) {
            clearInterval(pollInterval);
            button.classList.remove("loading");
          }
        }, 5000); // 每5秒輪詢一次
      }

      return result.success;
    } catch (error) {
      console.error("API call error:", error);
      showError(error.message || "連接服務器時發生錯誤，請稍後再試");
      throw error;
    } finally {
      // 注意：我們移除了這裡的 button.classList.remove('loading')，
      // 因為現在要等到輪詢完成才移除 loading 狀態
      if (!result?.callSid) {
        button.classList.remove("loading");
      }
    }
  };

  // 關閉按鈕點擊
  closeButton.addEventListener("click", closeModal);

  // 點擊彈出視窗外部關閉
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // 表單提交處理
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // 收集表單數據
    const formData = {
      companyName: document.getElementById("companyName").value,
      contactName: document.getElementById("contactName").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    console.log("Form submitted:", formData);
    // 這裡可以添加 API 調用代碼

    // 關閉彈出視窗
    closeModal();

    // 顯示提示訊息
    showToast();
  });

  // 主題按鈕處理
  const topicButtons = document.querySelectorAll(".topic-button");

  topicButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      let topic = button.getAttribute("data-topic");
      try {
        console.log(`Starting API call for topic: ${topic}`);

        // 這裡可以根據需求設置偏好
        const preferences = []; // 可以從某個來源獲取偏好設置

        // 調用實際的 API
        const testResult = await makeCallTest(topic, button, preferences);
      } catch (error) {
        console.error("Error during API call:", error);
        // 錯誤已經在 makeCallTest 中處理
      }
    });
  });
});
