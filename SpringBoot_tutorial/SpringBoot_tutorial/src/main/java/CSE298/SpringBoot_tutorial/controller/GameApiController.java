package CSE298.SpringBoot_tutorial.controller;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import CSE298.SpringBoot_tutorial.model.Games;
import CSE298.SpringBoot_tutorial.repository.GameRepository;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

@RestController
@RequestMapping("/api")
public class GameApiController {
    private final GameRepository GameList;
    @Autowired
    public GameApiController(GameRepository GameList){
        this.GameList = GameList;
    }

    @GetMapping("/games")
    public Object getGameList() throws IOException, ParseException {
        //可passin page number 加入？page=pagenum 来fetch下一页的
        String steamApiUrl = "https://api.rawg.io/api/games?key=56d8217442f84e2398c806076bdff38d";

        URL url = new URL(steamApiUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.setConnectTimeout(5000);

        int responseCode = connection.getResponseCode();
        if (responseCode == HttpURLConnection.HTTP_OK) {
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                response.append(line);
            }

            reader.close();
            //Parse the string response
            JSONParser parser = new JSONParser();
            JSONObject res = (JSONObject) parser.parse(String.valueOf(response));
            JSONArray game_list = (JSONArray) res.get("results");
            System.out.println(game_list.size());
            for (int i = 0; i < game_list.size(); i++){
                JSONObject game = (JSONObject) game_list.get(i);
                String name = game.get("name").toString();
                Integer id = Integer.parseInt(game.get("id").toString());
                Games temp = new Games(id, name);
                GameList.AddGame(temp);
            }
            return GameList.FindAllGames();

        } else {
            // Handle error response
            return responseCode;
        }
    }
}
