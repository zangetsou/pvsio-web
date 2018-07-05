package at.lukle.clickableareas;

import android.graphics.Bitmap;

/**
 * Created by andrepinto on 15/05/18.
 */

public class Image {
    Bitmap image;
    float left;
    float top;

    public Image( Bitmap a, float b, float c){
        image = a;
        left = b;
        top = c;
    }
}
