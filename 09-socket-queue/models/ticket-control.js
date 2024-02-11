const path = require('path');
const fs = require('fs');


class Ticket {
    constructor( number, desk ) {
        this.number = number;
        this.desk = desk;
    }
}


class TicketControl {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastfour = [];

        this.init();
    }

    get toJson() {
        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastfour: this.lastfour
        }
    }

    init() {
        const { today, tickets, last, lastfour } = require('../db/data.json');
        if ( today === this.today ) {
            this.tickets = tickets;
            this.last = last;
            this.lastfour = lastfour;
        } else {
            this.saveDB();
        }
    }

    saveDB() {
        const dbPath = path.join( __dirname, '../db/data.json' );
        fs.writeFileSync( dbPath, JSON.stringify( this.toJson ) );
    }

    next() {
        this.last += 1;
        const ticket = new Ticket( this.last, null );
        this.tickets.push( ticket );

        this.saveDB();
        return 'Ticket ' + ticket.number;
    }

    attendTicket( desk ) {
        if ( this.tickets.length === 0 ) {
            return null;
        }

        const ticket = this.tickets.shift(); //this.tickets[0];
        ticket.desk = desk;

        this.lastfour.unshift( ticket );

        if ( this.lastfour.length > 4 ) {
            this.lastfour.splice(-1,1); // Delete the last element
        }

        this.saveDB();
        return ticket;
    }
}

module.exports = TicketControl;