package tr.caglarboyuinsan.oyun;

import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.view.WindowManager;
import android.webkit.WebView;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;
import java.util.Locale;

// Oyun ekranın tamamını kullanır:
// - Durum çubuğu ve gezinme tuşları gizlenir (kenardan kaydırınca kısa süre görünür).
// - Uygulama kamera deliğinin / çentiğin yanına kadar çizer, üstte siyah şerit kalmaz.
// - Çentik ve görünür çubukların ölçüsü oyuna CSS değişkeni olarak bildirilir;
//   arayüz düğmeleri bu ölçü kadar içeride durur, arka plan resmi ise tüm ekranı kaplar.
public class MainActivity extends BridgeActivity {
    private final Handler handler = new Handler(Looper.getMainLooper());
    private int top, right, bottom, left;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            WindowManager.LayoutParams lp = getWindow().getAttributes();
            lp.layoutInDisplayCutoutMode = Build.VERSION.SDK_INT >= Build.VERSION_CODES.R
                ? WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_ALWAYS
                : WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            getWindow().setAttributes(lp);
        }
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);

        View decor = getWindow().getDecorView();
        ViewCompat.setOnApplyWindowInsetsListener(decor, (v, insets) -> {
            v.setPadding(0, 0, 0, 0);
            Insets i = insets.getInsets(WindowInsetsCompat.Type.displayCutout() | WindowInsetsCompat.Type.systemBars());
            float d = getResources().getDisplayMetrics().density;
            top = Math.round(i.top / d);
            right = Math.round(i.right / d);
            bottom = Math.round(i.bottom / d);
            left = Math.round(i.left / d);
            pushInsets();
            return insets;
        });

        hideBars();
        // Sayfa yüklenirken ilk değerler kaybolmasın diye birkaç kez daha bildir.
        for (int ms : new int[] { 400, 1200, 2500, 5000 }) handler.postDelayed(this::pushInsets, ms);
    }

    @Override
    public void onResume() {
        super.onResume();
        hideBars();
        handler.postDelayed(this::pushInsets, 300);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            hideBars();
            handler.postDelayed(this::pushInsets, 300);
        }
    }

    private void hideBars() {
        WindowInsetsControllerCompat c = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        c.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
        c.hide(WindowInsetsCompat.Type.systemBars());
    }

    private void pushInsets() {
        if (getBridge() == null) return;
        WebView w = getBridge().getWebView();
        if (w == null) return;
        String js = String.format(
            Locale.US,
            "(function(){var s=document.documentElement.style;" +
            "s.setProperty('--safe-area-inset-top','%dpx');s.setProperty('--safe-area-inset-right','%dpx');" +
            "s.setProperty('--safe-area-inset-bottom','%dpx');s.setProperty('--safe-area-inset-left','%dpx');" +
            "window.dispatchEvent(new Event('safearea'));})();",
            top, right, bottom, left
        );
        w.evaluateJavascript(js, null);
    }
}
