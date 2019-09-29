package springboot;

import java.text.SimpleDateFormat;
import java.util.Date;
import springboot.City;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.json.JSONObject;
import org.json.JSONArray;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import springboot.WeatherDataParser;

@Component
public class ScheduledWeatherUpdater {
    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private RestTemplate restTemplate;

    private static final Logger log = LoggerFactory.getLogger(ScheduledWeatherUpdater.class);

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
    @Value("${api.key}")
    private String apiKey;
    @Scheduled(fixedRate = 900000) //15 minutit
    public void updateCities() {
        Iterable<City> cities  = cityRepository.findAll();
        for (City c: cities){
            String rawJson = restTemplate.getForObject("https://api.openweathermap.org/data/2.5/weather?q="
                    + c.getName() + "&APPID="
                    + apiKey,String.class);
            WeatherDataParser dataParser = new WeatherDataParser();
            JSONObject root = new JSONObject(rawJson);
            JSONObject main = root.getJSONObject("main");
            JSONObject wind = root.getJSONObject("wind");

            Float temp    = main.getFloat("temp");
            Integer humidity = main.getInt("humidity");

            Integer speed   = wind.getInt("speed");
            Integer _deg = 0;
            if (wind.has("deg")){
                _deg = wind.getInt("deg");
            }
            String degString = dataParser.degToString(_deg);
            Float tempCelsius = dataParser.kelvinToCelsius(temp);
            c.setWindSpeed(speed);
            c.setWindDirection(degString);
            c.setHumidity(humidity);
            c.setTemp(tempCelsius);
            cityRepository.save(c);
        }
    }
}