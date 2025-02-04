import { Comics, Heroes } from "../../core/modelos/heroes.entity";
import { Result as FullHeroResult} from "../interfaces/heroe-db.response";
import { Result as HerosResult} from "../interfaces/heroes-db.responses";


export class HeroesMapper {
    static fromHeroesDBResultToEntity(result: HerosResult) : Heroes{
        return{
            id: result.id,
            name: result.name,
            description: result.description,
            thumbnail:`${result.thumbnail.path}.${result.thumbnail.extension}`,
            comicsNumber:result.comics.available
        }
    }

    static fromComicsDBToEntity(result: FullHeroResult):Comics{
        return{
            id: result.id,
            title: result.title,
            thumbnail:`${result.thumbnail.path}.${result.thumbnail.extension}`,
        }
    }
}

