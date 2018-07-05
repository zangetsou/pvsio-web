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
    

    






    long t11 = 0;
    long t12 = 0;
    long press = 0;
    long release = 0;

    int click=0;
    int on =0;


    @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {
        t12 = System.currentTimeMillis();
        if (click==0 && ev.getAction()==MotionEvent.ACTION_BUTTON_PRESS){
            t11=t12;
            click++;
            return super.dispatchTouchEvent(ev);
        }
        else {
            if(t12-t11 >250 && ev.getAction()==1){
//                Log.e(TAG,"this was a tap!");
                t11=t12;
                return super.dispatchTouchEvent(ev);
            }
            else if(t12-t11 >250 &&  ev.getAction()==0)
                return super.dispatchTouchEvent(ev);
            else {
                Log.e(TAG,"this was a double tap");
                return true;
            }
        }
    }

    

    // Listen for touches on your images:
    @Override
    public void onClickableAreaTouched(Object item) {
        switch ((int) item){

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








        //definition of initial background image






        ImageView background1 = (ImageView) findViewById(R.id.background);
        Bitmap bm = BitmapFactory.decodeResource(getResources(), R.drawable.background);

        background1.setImageBitmap(bm);
        background1.setScaleType(ImageView.ScaleType.CENTER_CROP);
        background1.post(new Runnable() {
            @Override
            public void run() {
                
              
                
              

               

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

        // Set your clickable areas to the image
            clickableAreasImage.setClickableAreas(clickableAreas);
        }

    private Bitmap combineImageIntoOne(ArrayList<Image> bitmap, int height, int width) {
        int w = 0, h = 0;
       /* for (int i = 0; i < bitmap.size(); i++) {
            if (i < bitmap.size() - 1) {
                w = bitmap.get(i).image.getWidth() > bitmap.get(i + 1).image.getWidth() ? bitmap.get(i).image.getWidth() : bitmap.get(i + 1).image.getWidth();
            }
            h += bitmap.get(i).image.getHeight();
        }
        w=4400;h=2160;
        */

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


