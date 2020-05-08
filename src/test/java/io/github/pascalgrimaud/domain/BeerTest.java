package io.github.pascalgrimaud.domain;

import static org.assertj.core.api.Assertions.assertThat;

import io.github.pascalgrimaud.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

public class BeerTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Beer.class);
        Beer beer1 = new Beer();
        beer1.setId(1L);
        Beer beer2 = new Beer();
        beer2.setId(beer1.getId());
        assertThat(beer1).isEqualTo(beer2);
        beer2.setId(2L);
        assertThat(beer1).isNotEqualTo(beer2);
        beer1.setId(null);
        assertThat(beer1).isNotEqualTo(beer2);
    }
}
