import {pool} from '../../connectionDb'
import {UserInterface, rowToUserInterface} from "../models/userModel";
import {RowDataPacket} from "mysql2/promise";
import { Request, Response } from "express";
import {Next} from "mysql2/typings/mysql/lib/parsers/typeCast";

/**Recherche d'un utilisateur*/
const userGetOne = async (request: Request, response: Response, next:Next) => {
    try {
        /**Creer une connexion avec la base de données SQL*/
        const connection = await pool.getConnection();

        /**Recuperation des données dans les parametres de la requete*/
        const id = request.params.id;

        /**Execute une requete sur la base de données SQL pour recuperer un dossier admin*/
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM user WHERE id_user = ?', [id]);

        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();

        if (rows.length === 0) {
            /** Renvoyer une reponse not found*/
            return response.status(404).json({message: 'Utilisateur non trouvé'});
        }

        /**Renvoyer une réponse de succès*/
        const user = rowToUserInterface(rows[0]);

        return response.status(200).json(user);

    } catch (error) {
        /**Renvoyer une réponse d'echec*/
        response.status(500).json({message: 'Erreur serveur'});
    }
};

/**Liste de toutes les mutuelles*/
const userGetAll = async (request: Request, response: Response) => {
    try {
        let users : UserInterface[] = [];

        /** Obtenir une connexion à partir du pool*/
        const connection = await pool.getConnection();

        /** Exécuter une requête SQL*/
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM user');

        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();

        /** Renvoyer une reponse not found*/
        if (rows.length === 0) {
            return response.status(404).json({ message: 'Aucun utilisateur trouvé' });
        }

        /**Traitement des donnees de retour de la requete*/
        for(let i=0;i<rows.length;i++){
            let user = rowToUserInterface(rows[i]);
            users.push(user);
        }
        /**Renvoyer une réponse de succès*/
        response.status(200).json(users);
    } catch (error) {

        /**Renvoyer une réponse  d'echec*/
        response.status(500).json({ message: 'Erreur serveur' });
    }
};

export {userGetOne, userGetAll};