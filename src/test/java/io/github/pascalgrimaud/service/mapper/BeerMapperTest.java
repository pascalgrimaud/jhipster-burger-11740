package io.github.pascalgrimaud.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class BeerMapperTest {
    private BeerMapper beerMapper;

    @BeforeEach
    public void setUp() {
        beerMapper = new BeerMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(beerMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(beerMapper.fromId(null)).isNull();
    }
}
