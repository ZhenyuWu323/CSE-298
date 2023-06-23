package CSE298.SpringBoot_tutorial.controller;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import CSE298.SpringBoot_tutorial.model.GameContent;
import CSE298.SpringBoot_tutorial.model.Games;
import CSE298.SpringBoot_tutorial.repository.GameRepository;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Validated
@RestController
@RequestMapping("/api")
@CrossOrigin
public class GameApiController {
    private final GameRepository GameList;
    @Autowired
    public GameApiController(GameRepository GameList){
        this.GameList = GameList;
    }

    @GetMapping("/games")
    public Object getGameList(@RequestParam("page") @Min(1) @Max(50) int PageNum) throws ParseException {
        GameList.CleanGame();
        String steamApiUrl = "https://api.rawg.io/api/games?key=c5cbbf661c79425e9064cd8c3976db42&page=" + String.valueOf(PageNum);
        System.out.println(steamApiUrl);
        StringBuilder response = new StringBuilder();
        HttpClient httpClient = HttpClients.createDefault();

        try {
            HttpGet request = new HttpGet(steamApiUrl);
            HttpResponse httpResponse = httpClient.execute(request);
            HttpEntity entity = httpResponse.getEntity();

            if (entity != null) {
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(entity.getContent()))) {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        response.append(line);
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        //Parse the string response
        JSONParser parser = new JSONParser();
        JSONObject res = (JSONObject) parser.parse(String.valueOf(response));

        Integer totalPage = Integer.parseInt(res.get("count").toString()) / 20;
        
        JSONArray game_list = (JSONArray) res.get("results");
        System.out.println(game_list.size());
        for (int i = 0; i < game_list.size(); i++){
            //Each Game
            JSONObject game = (JSONObject) game_list.get(i);

            //Game Name
            String name = game.get("name").toString();

            //Game ID
            Integer id = Integer.parseInt(game.get("id").toString());

            //Game Image
            String image = game.get("background_image").toString();

            //Game Genre
            JSONArray genre_list = (JSONArray) game.get("genres");
            List<String> genre = new ArrayList<>();
            for(int j = 0; j < genre_list.size(); j++){
                JSONObject temp = (JSONObject) genre_list.get(j);
                String item = temp.get("name").toString();
                genre.add(item);
            }

            //Game Platform
            JSONArray platform_list = (JSONArray) game.get("parent_platforms");
            List<String> platform = new ArrayList<>();
            for(int j = 0; j < platform_list.size(); j++){
                JSONObject temp = (JSONObject) platform_list.get(j);
                JSONObject each_temp = (JSONObject) temp.get("platform");
                String item = each_temp.get("name").toString();
                platform.add(item);
            }

            //Game metacritic
            String metacritic = "";
            if (game.get("metacritic") == null){
                metacritic = "0";
            }
            else{
                metacritic = game.get("metacritic").toString();
            }


            //Game release
            String release = "";
            if (game.get("released") == null){
                release = "0";
            }
            else{
                release = game.get("released").toString();
            }

            Games singleGame = new Games(id, name,image, genre, platform, metacritic, release);
            GameList.AddGame(singleGame);
        }
        return new GameContent(totalPage, GameList.FindAllGames());
    } 
}

