'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MarkSchema = new Schema({
    name: {
        type: String,
        required: ['Trage einen Namen ein!']
    },

    art: {
        type: String,
        required: ['Trag eine Art ein!']
    },

    long: {
        type: Number,
        required: ['Trag einen Längengrad ein!']
    },

    lat: {
        type: Number,
        required: ['Trag einen Breitengrad ein!']
    },

    marken: {
        type: String
    },

    terrainNotice: {
        type: String
    },

    hofDurchmesser: {
        type: Number,
        required: ['Trage einen Hofdurchmesser ein!']
    },

    kuppel: {
        type: Number,
        required: ['Trage die Kuppelhöhe ein!']
    },

    nestStr: {
        type: [{
            type: String,
            enum: ['schwach', 'mittel', 'stark', 'sehr-stark'],
            required: ['Trage eine Neststärke ein!']
        }]
    },

    lichVer: {
        type: [{
            type: String,
            enum: ['sonnig', 'teil-schatten', 'schatten', 'starker-schatten'],
            required: ['Trage die Lichvterhältnisse ein!']
        }]
    },

    schwester: {
        type: [{
            type: String,
            enum: ['nein', 'wenig', 'viele'],
        }]
    },

    baumAlter: {
        type: Number,
        default: 0
    },

    baumHoehe: {
        type: Number,
        default: 0
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    neuesNest: {
        type: Boolean,
        default: false
    },

    notice: {
        type: String,
    },
    picture: {
        type: String
    }
});

module.exports += mongoose.model('Markers', MarkSchema);

