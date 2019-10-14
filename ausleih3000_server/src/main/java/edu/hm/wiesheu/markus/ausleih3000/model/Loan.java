package edu.hm.wiesheu.markus.ausleih3000.model;

import jdk.nashorn.internal.objects.annotations.Constructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import javax.persistence.*;

import java.util.Date;


@Data
@Entity
@EqualsAndHashCode
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private  Item item;
    private  Date startDate;
    private  Date dueDate;
    private  String name;
    private  String surname;
    private  String cell;
    private  String lib;



}


