const sequelize = require("../db");
const { Sequelize, Model } = require("sequelize");

class Fav extends Model {
}

const favSchema = {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    photoId: {
        type: Sequelize.UUID,
    },
    photoDetail: {
        type: Sequelize.STRING(100000), 
        get: function() {
            return JSON.parse(this.getDataValue('photoDetail'));
        }, 
        set: function(val) {
            return this.setDataValue('photoDetail', JSON.stringify(val));
        }
    },
    favouriteBy: {
        type: Sequelize.UUID,
        allowNull: false
    }
};

Fav.init(favSchema, {
    sequelize,
    tableName: "favour"
});


module.exports = Fav;

