package springboot;
import java.lang.Math;

public class WeatherDataParser {
    public float kelvinToCelsius(float _temp){
        return Math.round(_temp - 273.15f);
    }
    public String degToString(Integer _deg){
        Integer val = (_deg % 360);
        Integer index = Math.round(val / 45) + 1;
        String[] array = {"Tuulesuund on Nord","Kirdetuul","Idatuul","Kagutuul","Lõunatuul","Edelatuul","Läänetuul","Loodetuul"};
        return array[index - 1];
    }

}
