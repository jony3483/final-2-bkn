import mongoose from "mongoose";
import {v4 as uuidv4} from 'uuid';


const ticketCollection = 'Tickets';

const TicketSchema = new mongoose.Schema({
  code: { 
        type: String,
        default: () => uuidv4(),
        required: true, 
        unique: true 
    },
  purchase_datetime: { 
    //fecha y hora exacta en la cual se hizo la compra
        type: Date, 
        default: Date.now 
    },
  amount: { 
    //total de la compra.
        type: Number, 
        required: true 
    },
  purchaser: {
    //tendrá el correo del usuario asociado al carrito
        type: String, 
        required: true 
    }
});

export const TicketModel = mongoose.model(ticketCollection, TicketSchema);

export default TicketModel;
