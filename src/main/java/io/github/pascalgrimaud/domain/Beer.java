package io.github.pascalgrimaud.domain;

import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Beer.
 */
@Entity
@Table(name = "beer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Beer implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "drink_date")
    private LocalDate drinkDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Beer name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDrinkDate() {
        return drinkDate;
    }

    public Beer drinkDate(LocalDate drinkDate) {
        this.drinkDate = drinkDate;
        return this;
    }

    public void setDrinkDate(LocalDate drinkDate) {
        this.drinkDate = drinkDate;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Beer)) {
            return false;
        }
        return id != null && id.equals(((Beer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Beer{" + "id=" + getId() + ", name='" + getName() + "'" + ", drinkDate='" + getDrinkDate() + "'" + "}";
    }
}
