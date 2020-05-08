package io.github.pascalgrimaud.service;

import io.github.pascalgrimaud.domain.Beer;
import io.github.pascalgrimaud.repository.BeerRepository;
import io.github.pascalgrimaud.service.dto.BeerDTO;
import io.github.pascalgrimaud.service.mapper.BeerMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Beer}.
 */
@Service
@Transactional
public class BeerService {
    private final Logger log = LoggerFactory.getLogger(BeerService.class);

    private final BeerRepository beerRepository;

    private final BeerMapper beerMapper;

    public BeerService(BeerRepository beerRepository, BeerMapper beerMapper) {
        this.beerRepository = beerRepository;
        this.beerMapper = beerMapper;
    }

    /**
     * Save a beer.
     *
     * @param beerDTO the entity to save.
     * @return the persisted entity.
     */
    public BeerDTO save(BeerDTO beerDTO) {
        log.debug("Request to save Beer : {}", beerDTO);
        Beer beer = beerMapper.toEntity(beerDTO);
        beer = beerRepository.save(beer);
        return beerMapper.toDto(beer);
    }

    /**
     * Get all the beers.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<BeerDTO> findAll() {
        log.debug("Request to get all Beers");
        return beerRepository.findAll().stream().map(beerMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one beer by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<BeerDTO> findOne(Long id) {
        log.debug("Request to get Beer : {}", id);
        return beerRepository.findById(id).map(beerMapper::toDto);
    }

    /**
     * Delete the beer by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Beer : {}", id);

        beerRepository.deleteById(id);
    }
}
