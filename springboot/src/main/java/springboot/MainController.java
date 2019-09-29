package springboot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.transaction.annotation.Transactional;
import org.json.JSONObject;
import org.json.JSONArray;
import springboot.WeatherDataParser;
import java.util.List;
@RestController
@RequestMapping(path="/weatherapi")
public class MainController {
    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${api.key}")
    private String apiKey;

    @CrossOrigin(origins = "*")
    @PostMapping(path="/add")
    public @ResponseBody String addNewCity (@RequestBody String name){
        JSONObject nameJSON = new JSONObject(name);
        name = nameJSON.getString("name");
        String rawJson = restTemplate.getForObject("https://api.openweathermap.org/data/2.5/weather?q="
                + name + "&APPID="
                + apiKey,String.class,"{" + name + "}");
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
        Integer deg = _deg;
        if (cityRepository.findByName(name).size() == 0) {
            City _city = new City();

            _city.setName(name);
            _city.setWindDirection(dataParser.degToString(deg));
            _city.setWindSpeed(speed);
            _city.setHumidity(humidity);
            _city.setTemp(dataParser.kelvinToCelsius(temp));
            cityRepository.save(_city);
        } else {
            return "City exists";
        }
        return "Saved";
    }

    @CrossOrigin(origins = "*")
    @Transactional
    @PostMapping(path="/delete")
    public @ResponseBody void deleteCity (@RequestBody String _name){
        JSONObject nameJSON = new JSONObject(_name);
        String name = nameJSON.getString("name");
        List<City> result = cityRepository.findByName(name);
        for(City city: result){
            cityRepository.deleteByName(city.getName());
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping(path="/all")
    public @ResponseBody Iterable<City> getAllCities() {
        return cityRepository.findAll();
    }

}