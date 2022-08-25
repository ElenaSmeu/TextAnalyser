package com.example.textanalyzer;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

/**
 * The program for calculating how many times letter in given sentence appears.
 * It gives numbers either for vowels or for consonants based on program input.
 * <p>
 * The first parameter can be 'vowels' or 'consonants'
 * The second parameter is the sentence to be analyzed.
 * <p>
 * Task: Refactor this code to be production ready and create appropriate unit tests.
 */



@RestController
public class TextAnalyzerController {

  @GetMapping("/textAnalyzer")
  @CrossOrigin(origins = "http://localhost:4200")
  public  HashMap<Character, Integer> textAnalyser(@RequestParam("type") LetterAnalyzerType letterAnalyzerType, @RequestParam(required = true) String text) {
    if (LetterAnalyzerType.VOWELS == letterAnalyzerType) {
      return vowelsAnalyze(text);
    } else if (LetterAnalyzerType.CONSONANTS == letterAnalyzerType) {
      return consonantsAnalyze(text);
    } else  {
      return new HashMap<>();
    }
  }

  public enum LetterAnalyzerType {
    VOWELS,
    CONSONANTS
  }

  public HashMap<Character, Integer> vowelsAnalyze(String input) {
    String text = input.toLowerCase();
    HashMap<Character, Integer> vowels = new HashMap<>();
    vowels.put('a', 0);
    vowels.put('e', 0);
    vowels.put('i', 0);
    vowels.put('o', 0);
    vowels.put('u', 0);
    vowels.keySet().forEach(
            key -> {
              vowels.computeIfPresent(key, (k,v) ->
                      Math.toIntExact(text.chars()
                              .filter(ch -> ch == key).count())
              );
            }
    );
   return vowels;

  }


  public HashMap<Character, Integer> consonantsAnalyze(String input) {
    String text = input.toLowerCase();
    HashMap<Character, Integer> consonants = new HashMap<>();

    char[] chars = text.toCharArray();
    for (int i = 0; i < chars.length; i++) {
      if (!isVowel(chars[i])
      ) {
        Character stringCharacter = chars[i];
        if (consonants.containsKey(stringCharacter)) {
          Integer num = consonants.get(stringCharacter);
          num++;
          consonants.put(stringCharacter, num);
        } else {
          consonants.put(stringCharacter, 1);
        }
      }
    }

    return consonants;
  }

  public boolean isVowel(Character v) {
    return v == 'a' || v == 'e' || v == 'i' || v == 'o' || v == 'u';
  }
}

