package CSE298.SpringBoot_tutorial.repository;


import java.util.HashMap;

import java.util.Map;

import org.springframework.stereotype.Repository;


@Repository
public class SessionRepository {
    private final Map<String, String> sessionList = new HashMap<>();

    public SessionRepository() {
    }

    // Add or update a session
    public void addOrUpdateSession(String key, String value) {
        sessionList.put(key, value);
    }

    // Remove a session
    public void removeSession(String key) {
        sessionList.remove(key);
    }

    // Fetch a session
    public String getSession(String key) {
        return sessionList.get(key);
    }
}
