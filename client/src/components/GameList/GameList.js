
import React from 'react'
import './GameList.css'
import { Link } from "react-router-dom";
import API from '../../utils/API';
var moment = require('moment')
/* Generic react component to display a list of all games passed to it through this.props.games */
class GameList extends React.Component{
    render(){
        return(
            <div className='gamesList'>
                <div className='categoryHeader'>{this.props.header}</div>
                {this.props.games.map((game)=>{
                return(
                    <div className='gameListItem'>
                        <div>
                            <Link to={"/all/games/" + game.id}>
                                <img src={'/assets/gameThumbnails/' + game.id} className='gameListImage'></img>
                            </Link>
                        </div>
                        <div className='gameListInfo'>
                            <div className='gameListHeader'>
                                <Link to={"/all/games/" + game.id}>
                                    <div className='gameListTitle'>{game.name}</div>
                                </Link>
                                {(this.props.owner ? (<button className='gameListDelete' onClick={()=>{
                                    var ans = window.confirm("Are you sure you want to delete this? There's no going back...");
                                    if(ans==true){
                                        this.props.deleteHandler(game.id)
                                    }}
                                        }>DELETE</button> ): (<div></div>))
                                    }
                            </div>
                            <div className='gameListDescription'>{game.description}</div>
                            <div className='gameListCreatedAt'>Published on {moment(game.createdAt).format('YYYY MMM DD hh:mm')}</div>
                        </div>
                    </div>
                )
                })}
            </div>
        )
    }
}

export default GameList