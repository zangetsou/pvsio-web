//TODO

//novo dispositivo redical 7  (demos)







package at.lukle.clickableareas;

import android.content.pm.ActivityInfo;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Bundle;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

import at.lukle.clickableareasimage.ClickableArea;
import at.lukle.clickableareasimage.ClickableAreasImage;
import at.lukle.clickableareasimage.OnClickableAreaClickedListener;
import uk.co.senab.photoview.PhotoViewAttacher;


public class MainActivity extends AppCompatActivity implements OnClickableAreaClickedListener {

    private final String TAG = getClass().getSimpleName();


    ImageView background = null;

    Double canvasScale = 2.7;
    int orientation = 1;
    
    State state = null;
    



    //variables needed for function below
    long timestamp1 = 0;
    long timestamp2 = 0;
    int isFirstClick=0;

    //function made to prohibite double tap functionality in order to prevent zoom of images
    @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {
        timestamp2 = System.currentTimeMillis();
        if (isFirstClick==0 && ev.getAction()==MotionEvent.ACTION_BUTTON_PRESS){
            timestamp1=timestamp2;
            isFirstClick
            ++;
            return super.dispatchTouchEvent(ev);
        }
        else {
            if(timestamp2-timestamp1 >250 && ev.getAction()==1){
//                Log.e(TAG,"this was a tap!");
                timestamp1=timestamp2;
                return super.dispatchTouchEvent(ev);
            }
            else if(timestamp2-timestamp1 >250 &&  ev.getAction()==0)
                return super.dispatchTouchEvent(ev);
            else {
//                Log.e(TAG,"this was a double tap");
                return true;
            }
        }
    }

    

    // Listen for touches on your images:
    @Override
    public void onClickableAreaTouched(Object item) {
        switch ((int) item){

            case 1:
                state = state.press_inc_saline(state);
                break;
            case 2:
                state = state.press_dec_saline(state);
                break;
            case 3:
                state = state.press_inc_contrast(state);
                break;
            case 4:
                state = state.press_dec_contrast(state);
                break;
            case 5:
                state = state.click_btn_auto(state);
                break;
            case 6:
                state = state.click_btn_manual(state);
                break;
            case 7:
                state = state.press_btn_fUP_saline(state);
                break;
            case 8:
                state = state.press_btn_sUP_saline(state);
                break;
            case 9:
                state = state.press_btn_sDOWN_saline(state);
                break;
            case 10:
                state = state.press_btn_fDOWN_saline(state);
                break;
            case 11:
                state = state.press_btn_fUP_contrast(state);
                break;
            case 12:
                state = state.press_btn_sUP_contrast(state);
                break;
            case 13:
                state = state.press_btn_sDOWN_contrast(state);
                break;
            case 14:
                state = state.press_btn_fDOWN_contrast(state);
                break;
            case 15:
                state = state.click_btn_fill_saline(state);
                break;
            case 16:
                state = state.click_btn_fill_contrast(state);
                break;
            case 17:
                state = state.click_btn_prime(state);
                break;
            case 18:
                state = state.click_btn_confirm(state);
                break;
            case 19:
                state = state.click_btn_console_engage(state);
                break;
            case 20:
                ;
                break;
            case 21:
                state = state.click_btn_start(state);
                break;
            case 22:
                state = state.press_btn_ACC(state);
                break;
            case 23:
                state = state.click_btn_confirm_security(state);
                break;
            case 24:
                state = state.rotate_injector(state);
                break;
            case 25:
                state = state.plug_syringe_saline(state);
                break;
            case 26:
                state = state.plug_syringe_contrast(state);
                break;
            case 27:
                state = state.plug_bag_saline(state);
                break;
            case 28:
                state = state.displayplug_bag_contrast(state);
                break;
            case 29:
                state = state.connect_infusion_set(state);
                break;
        }


    }






    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        state = new State();
        background = (ImageView) findViewById(R.id.background);
        if(orientation==0)
        this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
        else         this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);


        //definition of initial textViews text


        TextView tv1 = (TextView) findViewById(R.id.textView1);

        Typeface custom_font_tv1 = Typeface.createFromAsset(getAssets(),  "fonts/abc.ttf");
        tv1.setTypeface(custom_font_tv1);
        tv1.setText("---");
        tv1.setTextColor(Color.parseColor("#2DFF1B"));
        tv1.setTextSize(25);
        boolean visible1 = false;
        if(visible1) tv1.setVisibility(View.VISIBLE);
            else tv1.setVisibility(View.INVISIBLE);
        tv1.setTranslationX(120);
        tv1.setTranslationY(624);
        tv1.setHeight(50);
        tv1.setWidth(100);
        TextView tv2 = (TextView) findViewById(R.id.textView2);

        Typeface custom_font_tv2 = Typeface.createFromAsset(getAssets(),  "fonts/abc.ttf");
        tv2.setTypeface(custom_font_tv2);
        tv2.setText("---");
        tv2.setTextColor(Color.parseColor("#0000ff"));
        tv2.setTextSize(25);
        boolean visible2 = false;
        if(visible2) tv2.setVisibility(View.VISIBLE);
            else tv2.setVisibility(View.INVISIBLE);
        tv2.setTranslationX(280);
        tv2.setTranslationY(624);
        tv2.setHeight(50);
        tv2.setWidth(100);






        //definition of initial background image






        ImageView background1 = (ImageView) findViewById(R.id.background);
        Bitmap bm = BitmapFactory.decodeResource(getResources(), R.drawable.background);

        background1.setImageBitmap(bm);
        background1.setScaleType(ImageView.ScaleType.CENTER_CROP);
        background1.post(new Runnable() {
            @Override
            public void run() {
                ImageView background1 = (ImageView) findViewById(R.id.background);
                Bitmap bm1 = BitmapFactory.decodeResource(getResources(), R.drawable.all);
                Bitmap bm2 = BitmapFactory.decodeResource(getResources(), R.drawable.buttons_10);
                Bitmap bm3 = BitmapFactory.decodeResource(getResources(), R.drawable.console_led_off);
                Bitmap bm4 = BitmapFactory.decodeResource(getResources(), R.drawable.empty_console);
              
                ArrayList<Image> a=new ArrayList<Image>();
              
                a.add(new Image(bm1,0,0));
                a.add(new Image(bm2,0,0));
                a.add(new Image(bm3,0,0));
                a.add(new Image(bm4,0,0));

                Bitmap result = combineImageIntoOne(a,background1.getHeight(), background1.getWidth());
                background1.setImageBitmap(result);
                background1.setScaleType(ImageView.ScaleType.CENTER_CROP);

            }
        });


        //definition of clickable areas
        startClickableAreas();
    }

    private void startClickableAreas(){

        // Create your image
        ClickableAreasImage clickableAreasImage = new ClickableAreasImage(new PhotoViewAttacher(background), this);

        // Initialize your clickable area list
        List<ClickableArea> clickableAreas = new ArrayList<>();

        // Define your clickable areas
        // parameter values (pixels): (x coordinate, y coordinate, width, height) and assign an object to it

		//inc_saline
		clickableAreas.add(new ClickableArea(174, 607, 23, 23,(int) 1));

		//dec_saline
		clickableAreas.add(new ClickableArea(174, 642, 23, 23,(int) 2));

		//inc_contrast
		clickableAreas.add(new ClickableArea(260, 607, 23, 23,(int) 3));

		//dec_contrast
		clickableAreas.add(new ClickableArea(260, 642, 23, 23,(int) 4));

		//btn_auto
		clickableAreas.add(new ClickableArea(214, 625, 33, 33,(int) 5));

		//btn_manual
		clickableAreas.add(new ClickableArea(214, 765, 33, 33,(int) 6));

		//btn_fup_saline
		clickableAreas.add(new ClickableArea(115, 680, 65, 80,(int) 7));

		//btn_sup_saline
		clickableAreas.add(new ClickableArea(115, 760, 65, 58,(int) 8));

		//btn_sdown_saline
		clickableAreas.add(new ClickableArea(115, 818, 65, 58,(int) 9));

		//btn_fdown_saline
		clickableAreas.add(new ClickableArea(115, 876, 65, 65,(int) 10));

		//btn_fup_contrast
		clickableAreas.add(new ClickableArea(275, 680, 65, 80,(int) 11));

		//btn_sup_contrast
		clickableAreas.add(new ClickableArea(275, 760, 65, 58,(int) 12));

		//btn_sdown_contrast
		clickableAreas.add(new ClickableArea(275, 818, 65, 58,(int) 13));

		//btn_fdown_contrast
		clickableAreas.add(new ClickableArea(275, 876, 65, 65,(int) 14));

		//btn_fill_saline
		clickableAreas.add(new ClickableArea(110, 620, 60, 34,(int) 15));

		//btn_fill_contrast
		clickableAreas.add(new ClickableArea(295, 620, 60, 34,(int) 16));

		//btn_prime
		clickableAreas.add(new ClickableArea(215, 697, 33, 3,(int) 17));

		//btn_confirm
		clickableAreas.add(new ClickableArea(215, 836, 33, 33,(int) 18));

		//btn_engage
		clickableAreas.add(new ClickableArea(215, 913, 33, 33,(int) 19));

		//btn_stop
		clickableAreas.add(new ClickableArea(120, 970, 93, 46,(int) 20));

		//btn_start
		clickableAreas.add(new ClickableArea(242, 970, 93, 46,(int) 21));

		//btn_on
		clickableAreas.add(new ClickableArea(690, 962, 23, 23,(int) 22));

		//confirm_security_btn
		clickableAreas.add(new ClickableArea(655, 778, 130, 35,(int) 23));

		//rotate_injector
		clickableAreas.add(new ClickableArea(620, 235, 210, 28,(int) 24));

		//plug_syringe_saline
		clickableAreas.add(new ClickableArea(620, 290, 100, 28,(int) 25));

		//plug_syringe_contrast
		clickableAreas.add(new ClickableArea(738, 290, 100, 28,(int) 26));

		//spike_saline_bag
		clickableAreas.add(new ClickableArea(620, 330, 100, 27,(int) 27));

		//spike_contrast_bag
		clickableAreas.add(new ClickableArea(738, 365, 100, 27,(int) 28));

		//connect_infusion_set
		clickableAreas.add(new ClickableArea(620, 370, 217, 28,(int) 29));

        // Set your clickable areas to the image
            clickableAreasImage.setClickableAreas(clickableAreas);
        }

    private Bitmap combineImageIntoOne(ArrayList<Image> bitmap, int height, int width) {
        

        Double a = width * canvasScale;
        Double b = height * canvasScale;
        
        Bitmap temp = Bitmap.createBitmap(a.intValue(), b.intValue(), Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(temp);
        for (int i = 0; i < bitmap.size(); i++) {
            canvas.drawBitmap(bitmap.get(i).image, bitmap.get(i).left, bitmap.get(i).top, null);

        }
        return temp;
    }

    @Override
    protected void onResume(){
        super.onResume();



    }


}


