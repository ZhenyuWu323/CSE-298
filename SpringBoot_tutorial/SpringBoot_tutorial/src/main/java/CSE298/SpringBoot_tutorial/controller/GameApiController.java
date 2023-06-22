package CSE298.SpringBoot_tutorial.controller;
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
    public Object getGameList(@RequestParam("page") @Min(1) int PageNum) throws ParseException {
        GameList.CleanGame();
            String steamApiUrl = "https://api.rawg.io/api/games?key=c5cbbf661c79425e9064cd8c3976db42&page=" + String.valueOf(PageNum);
            System.out.println(steamApiUrl);
            StringBuilder response = new StringBuilder();
            try {
                URL url = new URL(steamApiUrl);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("GET");
                //connection.setConnectTimeout(5000);
                int responseCode = connection.getResponseCode();
                if (responseCode == HttpURLConnection.HTTP_OK) {
                    try (BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
                        String line;
                        while ((line = reader.readLine()) != null) {
                            response.append(line);
                        }
                    }
                } else {
                    System.out.println("HTTP Error: " + responseCode);
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
            JSONObject game = (JSONObject) game_list.get(i);
            String name = game.get("name").toString();
            Integer id = Integer.parseInt(game.get("id").toString());
            String image = game.get("background_image").toString();
            Games temp = new Games(id, name,image);
            GameList.AddGame(temp);
            }
            return new GameContent(totalPage, GameList.FindAllGames());
        } 
    }

