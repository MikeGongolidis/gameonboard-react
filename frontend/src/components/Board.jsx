import React from "react";
import {range} from 'lodash';
import { GameCell } from "./GameCell";
import classNames from "classnames";

export function Board({player, socket, columns, rows }){

    let gridRows =  range(0,rows).reverse() ;
    let gridColumns =  range(0,columns) ; 

    var style = classNames(
        'grid gap-1',{
        'grid-cols-7': (columns===7),
        'grid-cols-3': (columns===3),
        'grid-rows-6': (rows===6),
        'grid-rows-3': (rows===3),
    });

    return (
        <div className={style}>
        {
        gridRows.map( (row) => {

            return gridColumns.map( (column) => {
                return <GameCell
                         key={column+""+row}
                         column={column}
                         row={row}
                         player={player}
                         socket={socket}
                        />
            })
        })
        }
    </div>

    )
}