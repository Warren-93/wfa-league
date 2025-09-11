import "./globals.css";
import NavBar from "../components/NavBar";
import BottomNav from "../components/BottomNav";
import Toast from "../components/Toast";
import { ToastProvider } from "../hooks/useToast";
import { AuthProvider } from "../hooks/useAuth";   // ✅

export const metadata = {
  title: "Warriors Football Association",
  description: "Official WFA site — fixtures, results, standings, teams, players."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="pb-20 has-pitch-bg">
        <AuthProvider>    {/* ✅ Now auth context is global */}
          <ToastProvider>
            <NavBar />
            <main className="container pt-16 main-content">{children}</main>
            <BottomNav />
            <Toast />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
