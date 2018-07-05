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

    Double canvasScale = {{canvasScale}};
    int orientation = {{orientation}};
    
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

        {{#each buttons}}
            case {{number}}:
                {{#if functionName}}state = state.{{functionName}}(state){{/if}};
                break;
        {{/each}}
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


        {{#each displays}}
        TextView {{name}} = (TextView) findViewById(R.id.textView{{number}});

        {{#if font}}
        Typeface custom_font_{{name}} = Typeface.createFromAsset(getAssets(),  "{{font}}");
        {{name}}.setTypeface(custom_font_{{name}});
        {{/if}}
        {{name}}.setText("{{start_text}}");
        {{name}}.setTextColor(Color.parseColor("{{color}}"));
        {{name}}.setTextSize({{textsize}});
        boolean visible{{number}} = {{visible}};
        if(visible{{number}}) {{name}}.setVisibility(View.VISIBLE);
            else {{name}}.setVisibility(View.INVISIBLE);
        {{name}}.setTranslationX({{xpos}});
        {{name}}.setTranslationY({{ypos}});
        {{name}}.setHeight({{ysize}});
        {{name}}.setWidth({{xsize}});
        {{/each}}






        //definition of initial background image






        ImageView background1 = (ImageView) findViewById(R.id.background);
        Bitmap bm = BitmapFactory.decodeResource(getResources(), R.drawable.background);

        background1.setImageBitmap(bm);
        background1.setScaleType(ImageView.ScaleType.CENTER_CROP);
        background1.post(new Runnable() {
            @Override
            public void run() {
                {{#if images}}ImageView background1 = (ImageView) findViewById(R.id.background);{{/if}}
                {{#each images}}
                Bitmap bm{{number}} = BitmapFactory.decodeResource(getResources(), R.drawable.{{name}});
                {{/each}}
              
                {{#if images}}ArrayList<Image> a=new ArrayList<Image>();{{/if}}
              
                {{#each images}}
                a.add(new Image(bm{{number}},{{xpos}},{{ypos}}));
                {{/each}}

               {{#if images}} Bitmap result = combineImageIntoOne(a,background1.getHeight(), background1.getWidth());
                background1.setImageBitmap(result);
                background1.setScaleType(ImageView.ScaleType.CENTER_CROP);{{/if}}

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
        {{#each buttons}}

		//{{name}}
		clickableAreas.add(new ClickableArea({{xpos}}, {{ypos}}, {{xsize}}, {{ysize}},(int) {{number}}));
		{{/each}}

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


