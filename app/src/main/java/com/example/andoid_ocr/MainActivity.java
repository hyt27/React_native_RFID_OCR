//MainActivity.java
package com.example.andoid_ocr;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.SparseArray;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import com.google.android.gms.vision.Frame;
import com.google.android.gms.vision.text.TextBlock;
import com.google.android.gms.vision.text.TextRecognizer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MainActivity extends AppCompatActivity {
    private static final int REQUEST_IMAGE_CAPTURE = 1;
    private static final int PERMISSION_REQUEST_CAMERA = 2;
    private static final String ID_PATTERN = ".*CWR.*";

    private TextView textView, textView2;
    private EditText editText;
    private ImageView imageView;
    private Bitmap bitmap;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CAMERA}, PERMISSION_REQUEST_CAMERA);
        }

        ActivityCompat.requestPermissions(this,
                new String[]{Manifest.permission.READ_EXTERNAL_STORAGE,
                        Manifest.permission.WRITE_EXTERNAL_STORAGE},
                PackageManager.PERMISSION_GRANTED);

        textView = findViewById(R.id.textView);
        textView2 = findViewById(R.id.textView2);
        editText = findViewById(R.id.editText);
        imageView = findViewById(R.id.imageView);
    }

    public void buttonCapturePhoto(View view) {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {

            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CAMERA}, PERMISSION_REQUEST_CAMERA);
        } else {

            Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
            if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
                startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
            }
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {

            Bundle extras = data.getExtras();
            Bitmap imageBitmap = (Bitmap) extras.get("data");

            imageView.setImageBitmap(imageBitmap);
            performOCR(imageBitmap);
        }
    }

    private void performOCR(Bitmap imageBitmap) {
        try {
            TextRecognizer textRecognizer = new TextRecognizer.Builder(this).build();
            Frame frameImage = new Frame.Builder().setBitmap(imageBitmap).build();
            SparseArray<TextBlock> textBlockSparseArray = textRecognizer.detect(frameImage);
            String stringImageText = "";
            for (int i = 0; i < textBlockSparseArray.size(); i++) {
                TextBlock textBlock = textBlockSparseArray.get(textBlockSparseArray.keyAt(i));
                stringImageText = stringImageText + " " + textBlock.getValue();
            }
            //textView.setText(stringImageText);
            System.out.println("whole string: " + stringImageText);
            String[] lines = stringImageText.split("\n");
            //textView2.setText(lines[1]);

            String extractedID = "Not Found";
            String extractedName = "";

            for (String line : lines) {
                System.out.println("line:" + line);
                if (matchesPattern(line, ID_PATTERN)) {
                    System.out.println("match:" + line);
                    //textView2.setText(line);
                    int startIndex = line.indexOf("CWR");
                    extractedID = line.substring(startIndex);
                } else if (!line.isEmpty()) {
                    //extractedName = line;
                    //extractedID = "Not found";

                }
            }
            String[] filteredLines = filterLines(lines);
            extractedName = extractName(filteredLines);

            String resultText = "ID: " + extractedID + "\nName: " + extractedName;
            textView2.setText(resultText);

        } catch (Exception e) {
            textView2.setText("Failed");
        }
    }

    private boolean matchesPattern(String line, String pattern) {
        Pattern compiledPattern = Pattern.compile(pattern);
        Matcher matcher = compiledPattern.matcher(line);
        return matcher.matches();
    }

    private String[] filterLines(String[] lines) {
        List<String> filteredLinesList = new ArrayList<>();
        for (String line : lines) {
            if (!line.isEmpty() && !isIrrelevant(line)) {
                filteredLinesList.add(line);
            }
        }
        return filteredLinesList.toArray(new String[0]);

    }

    private boolean isIrrelevant(String line) {
        return line.contains("construction") ||
                line.contains("industry") ||
                line.contains("date") ||
                line.matches(".*\\d{2}-\\d{2}-\\d{4}.*") ||
                line.contains("card") ||
                line.contains("use") ||
                line.contains("dsba") ||
                line.contains("no") ||
                line.contains("oree") ||
                line.contains("eotta") ||
                line.contains("osblxi") ||
                line.contains("datie") ||
                line.contains("struction") ||
                line.contains("dale") ||
                line.contains("canst") ||
                line.contains("criminaloitence") ||
                line.contains("offence") ||
                line.contains("feetabe") ||
                line.contains("daie") ||
                line.contains("mmmm") ||
                line.contains("lree") ||
                line.contains("ebe") ||
                line.contains("i\\") ||
                line.contains("registration") ||
                Arrays.stream(line.split(" ")).anyMatch(word -> word.length() == 1) ||
                line.contains("eref") ||
                line.contains("adis") ||
                line.matches(".*\\d.*");
    }

    private String extractName(String[] lines) {
        for (String line : lines) {
            // Extract the name from lines containing at least one space
            if (line.contains(" ")) {
                return line;
            }
        }
        return "Not Found";
    }
}