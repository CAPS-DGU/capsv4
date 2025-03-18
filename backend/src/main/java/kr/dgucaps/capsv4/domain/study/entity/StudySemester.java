package kr.dgucaps.capsv4.domain.study.entity;

import java.time.Month;

public enum StudySemester {
    SPRING, SUMMER, FALL, WINTER;

    public static StudySemester fromMonth(Month month) {
        return switch (month) {
            case MARCH, APRIL, MAY, JUNE -> SPRING;
            case JULY, AUGUST -> SUMMER;
            case SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER -> FALL;
            case JANUARY, FEBRUARY -> WINTER;
        };
    }
}
