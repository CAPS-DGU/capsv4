package kr.dgucaps.capsv4.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "study_config_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StudyConfig {

    @Id
    private String configKey;

    private String configValue;

    private String description;
}
