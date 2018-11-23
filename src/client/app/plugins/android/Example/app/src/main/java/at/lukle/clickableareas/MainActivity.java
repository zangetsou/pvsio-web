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
import android.support.v7.app.AppCompatActivity;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
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

    Double canvasScale = 2.8;
    int orientation = 0;
    
    State state = null;
    



    //variables needed for function below
    long timestamp1 = 0;
    long timestamp2 = 0;

    //function made to prohibite double tap functionality in order to prevent zoom of images
    @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {
        timestamp2 = System.currentTimeMillis();

            if(timestamp2-timestamp1 >250 && ev.getAction()==MotionEvent.ACTION_DOWN){
//                Log.e(TAG,"this was a tap!");
                timestamp1=timestamp2;
                return super.dispatchTouchEvent(ev);
            }
            else if (ev.getAction()==MotionEvent.ACTION_UP){
                return super.dispatchTouchEvent(ev);
            }
            else {
//                Log.e(TAG,"this was a double tap");
                return true;
            }

    }



    // Listen for touches on your images:
    @Override
    public void onClickableAreaTouched(Object item) {
        switch ((int) item){

            case 1:
                TextView tv1 = (TextView) findViewById(R.id.textView1);
                tv1.setVisibility(View.VISIBLE);

                TextView tv2 = (TextView) findViewById(R.id.textView2);
                tv2.setVisibility(View.VISIBLE);
                Toast.makeText(getBaseContext(),"btn_on",
                        Toast.LENGTH_SHORT).show();
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


        final TextView tv1 = (TextView) findViewById(R.id.textView1);

        Typeface custom_font_tv1 = Typeface.createFromAsset(getAssets(),  "fonts/abc.ttf");
        tv1.setTypeface(custom_font_tv1);
        tv1.setText("99");
        tv1.setTextColor(Color.parseColor("#ffffff"));
        tv1.setTextSize(25);
        boolean visible1 = false;
        if(visible1) tv1.setVisibility(View.VISIBLE);
            else tv1.setVisibility(View.INVISIBLE);
        tv1.setTranslationX(820);
        tv1.setTranslationY(220);
        tv1.setHeight(50);
        tv1.setWidth(100);
        final TextView tv2 = (TextView) findViewById(R.id.textView2);

        Typeface custom_font_tv2 = Typeface.createFromAsset(getAssets(),  "fonts/abc.ttf");
        tv2.setTypeface(custom_font_tv2);
        tv2.setText("99");
        tv2.setTextColor(Color.parseColor("#ffffff"));
        tv2.setTextSize(25);
        boolean visible2 = false;
        if(visible2) tv2.setVisibility(View.VISIBLE);
            else tv2.setVisibility(View.INVISIBLE);
        tv2.setTranslationX(820);
        tv2.setTranslationY(340);
        tv2.setHeight(50);
        tv2.setWidth(100);


        final EditText txt1 = (EditText)  findViewById(R.id.editText1);
        txt1.setTranslationY(650);
        txt1.setText("Type your value here...");
        Button btn1 = (Button)  findViewById(R.id.button1);
        btn1.setTranslationY(630);
        btn1.setTranslationX(1100);

        final EditText txt2 = (EditText)  findViewById(R.id.editText2);
        txt2.setTranslationY(750);
        txt2.setText("Type your value here...");
        Button btn2 = (Button)  findViewById(R.id.button2);
        btn2.setTranslationY(730);
        btn2.setTranslationX(1100);

        btn1.setOnClickListener( new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                tv1.setText(txt1.getText());
            }
        });


        btn2.setOnClickListener( new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                tv2.setText(txt2.getText());
            }
        });


        txt1.setVisibility(View.INVISIBLE);
        txt2.setVisibility(View.INVISIBLE);
        btn1.setVisibility(View.INVISIBLE);
        btn2.setVisibility(View.INVISIBLE);


        //definition of initial background image






        ImageView background1 = (ImageView) findViewById(R.id.background);
        Bitmap bm = BitmapFactory.decodeResource(getResources(), R.drawable.background);

        background1.setImageBitmap(bm);
        background1.setScaleType(ImageView.ScaleType.CENTER_CROP);
        background1.post(new Runnable() {
            @Override
            public void run() {
                ImageView background1 = (ImageView) findViewById(R.id.background);
                Bitmap bm1 = BitmapFactory.decodeResource(getResources(), R.drawable.radical_7);
              
                ArrayList<Image> a=new ArrayList<Image>();
              
                a.add(new Image(bm1,0,0));

                Bitmap result = combineImageIntoOne(a,background1.getHeight(), background1.getWidth());
                background1.setImageBitmap(result);
                background1.setScaleType(ImageView.ScaleType.CENTER_CROP);
                startClickableAreas();
            }
        });


        //definition of clickable areas

    }

    private void startClickableAreas(){

        // Create your image
        ClickableAreasImage clickableAreasImage = new ClickableAreasImage(new PhotoViewAttacher(background), this);

        // Initialize your clickable area list
        List<ClickableArea> clickableAreas = new ArrayList<>();

        // Define your clickable areas
        // parameter values (pixels): (x coordinate, y coordinate, width, height) and assign an object to it

        clickableAreas.add((new ClickableArea(1040,330,50,50,1)));

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


