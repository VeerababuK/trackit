package com.veera.trackit.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.veera.trackit.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.veera.trackit.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Calendar.class.getName(), jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Iteration.class.getName(), jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Milestone.class.getName(), jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Epic.class.getName(), jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Epic.class.getName() + ".features", jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Epic.class.getName() + ".tags", jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Epic.class.getName() + ".discussions", jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Feature.class.getName(), jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Feature.class.getName() + ".stories", jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Story.class.getName(), jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Story.class.getName() + ".tasks", jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Story.class.getName() + ".children", jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Story.class.getName() + ".defects", jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Story.class.getName() + ".tags", jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Story.class.getName() + ".discussions", jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Task.class.getName(), jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Task.class.getName() + ".tags", jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Task.class.getName() + ".discussions", jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Defect.class.getName(), jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Defect.class.getName() + ".discussions", jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Project.class.getName(), jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Project.class.getName() + ".members", jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Member.class.getName(), jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Member.class.getName() + ".epics", jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Member.class.getName() + ".features", jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Member.class.getName() + ".stories", jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Member.class.getName() + ".tasks", jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Member.class.getName() + ".defects", jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Discussion.class.getName(), jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.Tag.class.getName(), jcacheConfiguration);
            cm.createCache(com.veera.trackit.domain.ReleaseX.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
