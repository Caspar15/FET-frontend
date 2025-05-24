import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'WebView Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const WebViewHomePage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class WebViewHomePage extends StatefulWidget {
  const WebViewHomePage({super.key});

  @override
  State<WebViewHomePage> createState() => _WebViewHomePageState();
}

class _WebViewHomePageState extends State<WebViewHomePage> {
  late final WebViewController _controller;

  @override
  void initState() {
    super.initState();
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..setNavigationDelegate(
        NavigationDelegate(
          
          onProgress: (int progress) {
            // Update loading bar.
          },
          onPageStarted: (String url) {},
          onPageFinished: (String url) {},
          onWebResourceError: (WebResourceError error) {},
        ),
      )
      ..loadRequest(Uri.parse('https://atcc0903003904.ngrok.dev/'));
  }
  

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(60.0),
        child: Container(
          decoration: BoxDecoration(
            color: const Color(0xFFD3050F),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.1),
                blurRadius: 4,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Row(
                children: [
                  Column(children: [
                    Text(
                      'Hi, 晚安!',
                      style: TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.w500,
                        color: Theme.of(context).colorScheme.onPrimary,
                      ),
                    ),
                    Text(
                      'VIP用戶',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w300,
                        color: Theme.of(context).colorScheme.onPrimary,
                      ),
                    ),
                  ]),
                  const Spacer(),
                  Icon(Icons.notifications_outlined,
                      size: 30, color: Theme.of(context).colorScheme.onPrimary),
                  Text(
                    '通知',
                    style: TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w500,
                      color: Theme.of(context).colorScheme.onPrimary,
                    ),
                  ),
                  const SizedBox(width: 15),
                  Icon(Icons.support_agent,
                      size: 30, color: Theme.of(context).colorScheme.onPrimary),
                  Text(
                    '客服',
                    style: TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w500,
                      color: Theme.of(context).colorScheme.onPrimary,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
      body: WebViewWidget(controller: _controller),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: const Color.fromARGB(255, 255, 255, 255),
        selectedItemColor: const Color(0xFFD3050F),
        unselectedItemColor: const Color(0xFF989898),
        type: BottomNavigationBarType.fixed,
        items: [
          BottomNavigationBarItem(
            icon: ColorFiltered(
              colorFilter: ColorFilter.mode(
                const Color(0xFFD3050F),
                BlendMode.srcIn,
              ),
              child: GestureDetector(
                onTap: () {
                  if (Navigator.canPop(context)) {
                    Navigator.pop(context);
                  }
                },
                child: Image.asset('asset/phone.png', width: 24, height: 24),
              ),
            ),
            label: '電信服務',
          ),
          BottomNavigationBarItem(
            icon: ColorFiltered(
              colorFilter: ColorFilter.mode(
                const Color(0xFF989898),
                BlendMode.srcIn,
              ),
              child: Image.asset('asset/facebook.png', width: 24, height: 24),
            ),
            label: '心生活',
          ),
          BottomNavigationBarItem(
            icon: ColorFiltered(
              colorFilter: ColorFilter.mode(
                const Color(0xFF989898),
                BlendMode.srcIn,
              ),
              child: Image.asset('asset/star.png', width: 24, height: 24),
            ),
            label: '心發現',
          ),
          BottomNavigationBarItem(
            icon: ColorFiltered(
              colorFilter: ColorFilter.mode(
                const Color(0xFF989898),
                BlendMode.srcIn,
              ),
              child: Image.asset('asset/user.png', width: 24, height: 24),
            ),
            label: '會員',
          ),
        ],
        currentIndex: 0,
        onTap: (index) {
          // 這裡可以根據需求切換頁面
        },
      ),
    );
  }
}
