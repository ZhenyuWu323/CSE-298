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
import CSE298.SpringBoot_tutorial.model.GameDetail;
import CSE298.SpringBoot_tutorial.model.GameStores;
import CSE298.SpringBoot_tutorial.model.Games;
import CSE298.SpringBoot_tutorial.model.Genre;
import CSE298.SpringBoot_tutorial.model.Platforms;
import CSE298.SpringBoot_tutorial.repository.GameRepository;
import CSE298.SpringBoot_tutorial.repository.GenreRepository;
import CSE298.SpringBoot_tutorial.repository.PlatformRepository;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;

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
    private final GenreRepository GenreList;
    private final PlatformRepository PlatformList;
    @Autowired
    public GameApiController(GameRepository GameList, GenreRepository GenreList, PlatformRepository PlatformList){
        this.GameList = GameList;
        this.GenreList = GenreList;
        this.PlatformList = PlatformList;
    }

    @GetMapping("/games")
    public Object getGameList(@RequestParam("page") @Min(1) int PageNum, @RequestParam(required = false) String genres, @RequestParam(required = false) String platforms, @RequestParam(required = false) String ordering, @RequestParam(required = false) String search) throws ParseException {
        GameList.CleanGame();
        String steamApiUrl = "https://api.rawg.io/api/games?key=c5cbbf661c79425e9064cd8c3976db42&page=" + String.valueOf(PageNum);
        if(genres != null){
            steamApiUrl = steamApiUrl + "&genres=" + genres;
        }
        if(platforms != null){
            steamApiUrl = steamApiUrl + "&parent_platforms=" + platforms;
        }
        if(ordering != null){
            steamApiUrl = steamApiUrl + "&ordering=" + ordering;
        }
        if(search != null){
            steamApiUrl = steamApiUrl + "&search=" + search;
        }
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
            String id = game.get("id").toString();

            //Game Image
            String image = "";
            if(game.get("background_image") != null){
                image = game.get("background_image").toString();
            }

            //Game Genre
            List<String> genre = new ArrayList<>();
            if(game.get("genres") != null){
                JSONArray genre_list = (JSONArray) game.get("genres");
                if(genre_list.size() > 0 ){
                    for(int j = 0; j < genre_list.size(); j++){
                    JSONObject temp = (JSONObject) genre_list.get(j);
                    String item = temp.get("name").toString();
                    genre.add(item);
                    }
                }
            }

            //Game Platform
            //JSONArray platform_list = (JSONArray) game.get("parent_platforms");
            List<String> platform = new ArrayList<>();
            if(game.get("parent_platforms") != null){
                JSONArray platform_list = (JSONArray) game.get("parent_platforms");
                if(platform_list.size() > 0){
                    for(int j = 0; j < platform_list.size(); j++){
                    JSONObject temp = (JSONObject) platform_list.get(j);
                    JSONObject each_temp = (JSONObject) temp.get("platform");
                    String item = each_temp.get("name").toString();
                    platform.add(item);
                    }
                }
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
    
    @GetMapping("/queryGame")
    public Object getGame( @RequestParam @NotEmpty String gameId) throws ParseException {
        String steamApiUrl = "https://api.rawg.io/api/games/"  + String.valueOf(gameId) + "?key=c5cbbf661c79425e9064cd8c3976db42";
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

        String name = res.get("name").toString();

        String description = "";
        if(res.get("description_raw") != null){
                description = res.get("description_raw").toString();
        }

        String web= "";
        if(res.get("website") != null){
                web = res.get("website").toString();
        }

        String image = "";
        if(res.get("background_image") != null){
            image = res.get("background_image").toString();
        }

        List<String> tags = new ArrayList<>();
        if(res.get("tags") != null){
            JSONArray tag_list = (JSONArray) res.get("tags");
            if(tag_list.size() > 0 ){
                for(int j = 0; j < tag_list.size(); j++){
                    JSONObject temp = (JSONObject) tag_list.get(j);
                    String item = temp.get("name").toString();
                    tags.add(item);
                }
            }
        }

        List<GameStores> stores = new ArrayList<>();
        if(res.get("stores") != null){
            JSONArray store_list = (JSONArray) res.get("stores");
            if(store_list.size() > 0 ){
                for(int j = 0; j < store_list.size(); j++){
                    JSONObject temp = (JSONObject) store_list.get(j);
                    if(temp.get("store") != null){
                        JSONObject store = (JSONObject) temp.get("store");
                        String store_name = "";
                        String store_domain = "";
                        if(store.get("name") != null){
                            store_name = store.get("name").toString();
                        }
                        if(store.get("domain") != null){
                            store_domain = store.get("domain").toString();
                        }
                        GameStores new_store = new GameStores(store_name, store_domain);
                        stores.add(new_store);
                    }
                }
            }
        }

        List<String> genre = new ArrayList<>();
        if(res.get("genres") != null){
            JSONArray genre_list = (JSONArray) res.get("genres");
            if(genre_list.size() > 0 ){
                for(int j = 0; j < genre_list.size(); j++){
                JSONObject temp = (JSONObject) genre_list.get(j);
                String item = temp.get("name").toString();
                genre.add(item);
                }
            }
        }

        List<String> platform = new ArrayList<>();
        if(res.get("parent_platforms") != null){
            JSONArray platform_list = (JSONArray) res.get("parent_platforms");
            if(platform_list.size() > 0){
                for(int j = 0; j < platform_list.size(); j++){
                JSONObject temp = (JSONObject) platform_list.get(j);
                JSONObject each_temp = (JSONObject) temp.get("platform");
                String item = each_temp.get("name").toString();
                platform.add(item);
                }
            }
        }

        String metacritic = "";
        if (res.get("metacritic") == null){
            metacritic = "0";
        }
        else{
            metacritic = res.get("metacritic").toString();
        }

        String release = "";
        if (res.get("released") == null){
            release = "0";
        }
        else{
            release = res.get("released").toString();
        }
        return new GameDetail(name, description, web, image, tags, stores, genre, platform, metacritic, release);
    } 

    @GetMapping("/genres")
    public Object getGenreList() throws ParseException {
        GenreList.CleanGenre();
        String steamApiUrl = "https://api.rawg.io/api/genres?key=c5cbbf661c79425e9064cd8c3976db42";
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
        
        JSONArray genre_list = (JSONArray) res.get("results");
        for (int i = 0; i < genre_list.size(); i++){
            //Each Genre
            JSONObject genre = (JSONObject) genre_list.get(i);

            //Genre Name
            String name = genre.get("name").toString();

            //Genre ID
            String id = genre.get("id").toString();

            //Genre Image
            String image = genre.get("image_background").toString();
            Genre singleGenre = new Genre(id, name, image);
            GenreList.AddGenre(singleGenre);
        }
        return GenreList.FindAllGenre();
    } 

    @GetMapping("/platforms")
    public Object getPlatformList() throws ParseException {
        PlatformList.CleanPlatform();;
        String steamApiUrl = "https://api.rawg.io/api/platforms/lists/parents?key=c5cbbf661c79425e9064cd8c3976db42";
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
        
        JSONArray platform_list = (JSONArray) res.get("results");
        for (int i = 0; i < platform_list.size(); i++){
            //Each platform
            JSONObject platform = (JSONObject) platform_list.get(i);

            //platform Name
            String name = platform.get("name").toString();

            //platform ID
            String id = platform.get("id").toString();

            Platforms singlePlatform = new Platforms(id, name);
            PlatformList.AddPlatform(singlePlatform);
        }
        return PlatformList.FindAllPlatform();
    } 
}

