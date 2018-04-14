package pl.kjkow.server;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import pl.kjkow.server.model.Area;

import java.io.IOException;

/**
 * Created by kamil on 2018-04-14.
 */
public class AreaSerializer extends JsonSerializer<Area> {

    @Override
    public void serialize(Area area, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeString(area.getLabel());
    }
}
