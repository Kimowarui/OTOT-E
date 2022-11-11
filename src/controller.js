import { Player, get } from './model.js';
import Redis from 'ioredis';
const redis = new Redis();

const DEFULT_EXPIRATION = 3600;

export function index(req, res) {
    redis.get("players", (err, players) => {
        if (err) {
            console.error(err);
            res.json({
                status: "error",
                message: err,
            });
            return;
        }
        if (players != null) {
            return res.json(JSON.parse(players));
        } else {
            get(async function (err, players) {
                if (err) {
                    console.error(err);
                    res.json({
                        status: "error",
                        message: err,
                    });
                    return;
                }
                redis.set("players", JSON.stringify(players), "EX", DEFULT_EXPIRATION);
                res.json({
                    status: "success",
                    message: "Players retrieved successfully",
                    data: players
                });
            });
        }
    });
    
};
export async function createItem(req, res) {
    var player = new Player();
    player.name = req.body.name ? req.body.name : player.name;
    player.gender = req.body.gender;
    player.email = req.body.email;
    player.phone = req.body.phone;
    redis.set(player._id, JSON.stringify(player), "EX", DEFULT_EXPIRATION);
    player.save(function (err) {
        if (err) {
            console.error(err);
            res.json({
                status: "error",
                message: err,
            });
            return;
        }
        
        res.json({
            message: 'New player created!',
            data: player
        });
    });
};
// Handle view player info
export function viewItem(req, res) {
    Player.findById(req.params.player_id, function (err, player) {
        if (err) {
            console.error(err);
            res.json({
                status: "error",
                message: err,
            });
            return;
        }
        redis.set(player._id, JSON.stringify(player), "EX", DEFULT_EXPIRATION);
        res.json({
            message: 'Player details loading..',
            data: player
        });
    });
};
// Handle update player info
export function update(req, res) {
    Player.findById(req.params.player_id, function (err, player) {
        if (err) {
            console.error(err);
            res.json({
                status: "error",
                message: err,
            });
            return;
        }
        console.log(req.body.name ? req.body.name : player.name);
        // player.name = req.body.name ? req.body.name : player.name;
        player.gender = req.body.gender;
        player.email = req.body.email;
        player.phone = req.body.phone;
        redis.set(player._id, JSON.stringify(player), "EX", DEFULT_EXPIRATION);
        // save the player and check for errors
        player.save(function (err) {
            if (err) {
                console.error(err);
                res.json(err);
                return;                
            }
            res.json({
                message: 'Player Info updated',
                data: player
            });
        });
    });
};

export function cache(req, res, next) {
    const { id } = req.params;
    console.log(id);
    if (!id) {
        return next();
    }
    redisClient.get(id, (error, player) => {
      if (error) {
        console.error(err);
        throw error;
      }
      if (player != null) {
        return res.json(JSON.parse(result));
      } else {
        return next();
      }
    });
  };
