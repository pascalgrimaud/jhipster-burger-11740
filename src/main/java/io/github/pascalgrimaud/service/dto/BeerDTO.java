package io.github.pascalgrimaud.service.dto;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A DTO for the {@link io.github.pascalgrimaud.domain.Beer} entity.
 */
public class BeerDTO implements Serializable {
    private Long id;

    private String name;

    private LocalDate drinkDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDrinkDate() {
        return drinkDate;
    }

    public void setDrinkDate(LocalDate drinkDate) {
        this.drinkDate = drinkDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BeerDTO)) {
            return false;
        }

        return id != null && id.equals(((BeerDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "BeerDTO{" + "id=" + getId() + ", name='" + getName() + "'" + ", drinkDate='" + getDrinkDate() + "'" + "}";
    }
}
