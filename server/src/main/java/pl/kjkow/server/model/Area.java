package pl.kjkow.server.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import pl.kjkow.server.AreaSerializer;

import java.util.Arrays;

/**
 * Created by Kamil.Kowalczyk on 2018-04-13.
 */
@JsonSerialize(using=AreaSerializer.class)
public enum Area {

    W_PIERWSZEJ_CHWILI("W pierwszej chwili"),
    MATERIALY_REFERENCYJNE("Materiały referencyjne"),
    OBOWIAZKI("Obowiązki"),
    W_NIEDALEKIEJ_PRZYSZLOSCI("W niedalekiej przyszłości"),
    MOZE_KIEDYS("Może kiedyś"),
    UKONCZONE("Zadania ukończone");

    private String label;

    Area(String s) {
        label = s;
    }

    public String getLabel(){
        return label;
    }

    @JsonCreator
    public static Area fromValue(String value) {
        for (Area area : values()) {
            if (area.label.equalsIgnoreCase(value)) {
                return area;
            }
        }
        throw new IllegalArgumentException(
                "Unknown enum type " + value + ", Allowed values are " + Arrays.toString(values()));
    }

    @Override
    public String toString(){
        return label;
    }
}
