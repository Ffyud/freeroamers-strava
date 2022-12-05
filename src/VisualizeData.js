import React, { useEffect, useState } from "react"
import Map from "./Map"


// TODO figure out taking screenshots (html2canvas)
const VisualizeData = props => {

    const object = JSON.parse(JSON.stringify({
        "user": {
          "username": "Test",
          "firstname": "testfirst",
          "lastname": "testlast",
          "avatar": "derk"
        },
        "activity_data": [
          {
            "id": 8117502923,
            "name": "Avondrit",
            "average_speed": 8.015,
            "max_speed": 11.392,
            "average_watts": 142,
            "distance": 31088.3,
            "total_elevation_gain": 15.6,
            "moving_time": 3879,
            "summary_polyline": "yw{cIy{eg@u@rA_@^iJdF{@p@[^_CxDiAzB{AnDoBvFm@zBIp@]vEAdDT~HGpBSr@Cl@_@vAaCfLq@hCe@lCuEvTa@|@o@Vq@OkCsBe@m@oBuCkCyF{AkCe@q@O@KNc@vAk@tAY`@A^M`@_B~DIv@P|BB~@Lx@N\\P|B`@rCFx@Nn@Mh@MJMCMOe@iAk@y@q@_@[E}AXuAImLoA_Di@k@[oKkJ}GoGo@WqAGm@PmCxAm@b@Y\\uAfCk@rAiAvDMPa@R}TvEw[vGcMzBgThEwC^eBHuIQwDNaCe@{Wk@{BQaOoH}B}AoB_AOi@?[jDgtCBUHM~BIPa@BWp@yp@L_@VOzFgA\\[T_APQ@KEu@PaA?cBHyEEkAMaBQgAWcAwAyC]}Ac@uC_@oDy@yMOaIIuAQo@k@s@Qe@Im@[aE{@sCw@eFEiEWuEo@iEgAcLOsCAoDEiAm@wHKk@_AeBcAgC}A_CcBqBkC}A{I_IsBiA{E{D_@u@s@wCWa@e@i@sAy@gA}AyA}A]?[NkMhIaEtDeI|E_Ar@KBUQASHsCDaMFoC\\mH?eAKqE}@yGAcALoB?cAi@iFA{ABiAjJys@^}Ap@aCXeER}AT}@bBeE@_@Mc@yAqCsQwWgAsAoDmDoI{LaAiBCUBSb@yAXo@LO`@MIe@lCsGv@oAj@iCJ{AGsA{@sAI_@?SlA}EnA}FZs@l@u@\\s@Vy@x@aDx@aBnAgB~DoItGmJzA_CxBuBdEyEbDaDdCoCp@aAdEwErBgCfCsD`D_El@e@hBq@n@m@bD{DjFwG|DoFdA_AdBm@d@WzBsBtCkDd@ILWNgAdB{BnBiFHGJB^b@t@LXT|KjTxHrOfB`Dp_@dv@h@v@jIxPlC`FnPd\\lDlHpD~GfV~e@fCnFpXji@|AlCrBzE~BpEv@hA~HxOnTlb@vBtDx@YpCuAh@|@DTHjAHRnBxNn@dErF~a@A]DKj@SzHyE|Ay@hEaBR@VbD@p@In@?r@|@zGT|BjAjJp@fGDP?l@m@n@ER?ZNj@EPb@pD|B|Q~@jHr@nGN^d@d@FTLhAfB~EEd@F`@X^b@ChAhC?NEPWTeA`B?j@VjCj@jBj@fCt@~Bh@fCh@`DTt@h@lBpCtHrEnNLj@r@zGh@jDf@|EhBjNPj@b@j@Rb@PdA"
          },
          {
            "id": 8112342645,
            "name": "Rondje Berenkuil",
            "average_speed": 7.186,
            "max_speed": 15.998,
            "average_watts": 141.3,
            "distance": 36740.6,
            "total_elevation_gain": 107.5,
            "moving_time": 5113,
            "summary_polyline": "k{g`I{i{[sDjOiAbDe@LiE_DeAxCeGtDuArCa@hDaCxI_@j@iHpCmMd@nCjc@XfIKfAcDrLkAjGaAfKJdIq@`Lk@bBqDnDqGmAg@VaPjcAe@LwZmEgDZoEu@{@|NcAvCuBpAwIy@U`a@oDPIlBwClNFnF}C~ZuBzGkDhW@xJVbBv@pBrFdGSf@LbBOtAuEdM]|BG|DHdDdIhs@t@lEhBpFi@jCeBtAGvBYt@uCzAyDe@cF|Es@RmGmB}BBiBkCaAoJ}AuCuCgC{AmFcBoDaB_Va@oOyAoIyCqMfAaKnAyDAkEZoB_CkA_GWcA}@k@kAUeBOmIuDm_@uByK|EyGPwKcB}Es@oE]{@u@k@}AEgD_BkAwAs@cCiAgBoBcAI{@MaFRuCj@kBlBoBbBUtEtCfD`@|AgA|CaByBfAYIu@mDaCwGeCqByAsD_DeFy@RcH}OuAwBaBb@{@pA}@pCeChBgCi@kDwB}Bc@iCeEqB?_FsAKl@gOse@eBzB_DtAwBxBoFxCgAwCaAsEc@MiIrLYp@Dj@vDfMG`@mB|BxClJfB`Ix@zBhCcLz@wApA_@pGpCfAO`GsFpDmEzAuCfAmDtB_CN}@AeClAYpFrElCfDrIfUAZj@LbBiAtAiDrAiBfAOh@`@bEpJfDdGT@pBvERR|@e@jAdDzC~BFx@fBjEPjASPf@vBWr@y@\\yDg@cFmCcBh@sBlCg@dCAfClB`R]nCJbEi@fBCjDTdDs@lFaFxAa@z@lAjQ_ANwA]_Dp@gBaCmCiBcAx@a@lCA|@R|@zB`D^lAf@pMbAhDjBnClIpBT`A|@x@r@BPm@]j@y@Aq@m@Mg@Fg@[`CEbEh@`Ds@fWsAPog@eCoJuEqB{B{A{@qKYaK}A{F_DwBqBBYz@fBz@l@bG`DfJnArLb@fDhDbJrErj@~Cd@~@KkFj@gQg@qE?aBf@}Hg@qHy@kE@oAl@_D?uDa@wImAaNZ_A~E}@R]b@mEQmEDcCd@{BEmEZuC[eEi@wDa@qF?oCf@sBvAcBlB{@~FtCbEZn@}@hMmI`DgEtGkKnFeM`AoDr@aAzCyBhIUIeF_@{C`AC`BoNdGcT~@QpA_BhAwGjA[JyBnA{GhQqA~@}@zFaLlA[PW@iAuAaAq@wDx@aEh@kFxEyN`B_CdDyC@oC|EoMr@cJ`AgDxA}BnFgFpC}E\\yExDeEtEiDbDzBbBq@vE_SH}AvBgJJsCi@qHdHoBtKeBtJqCrVsE"
          }
        ],
        "total_ride_count": 115,
        "total_distance": 5320,
        "biggest_distance": 155,
        "elevation_gain": 100,
        "moving_time": 234
      })) // dummy data


    const [stravaData, setStravaData] = useState(object)
    const [stravaActivity, setStravaActivity] = useState([])

    useEffect(() => {
        if(props.data !== null) {
            setStravaData(props.data)
        }
    }, [props.data, stravaData])

    return (
        <div className="page-wrap">
            <div className="header-avatar"><img alt="avatar" src={stravaData.user.avatar}/></div>
            <div className="header-name">
              {stravaData.user.firstname} {" "} {stravaData.user.lastname} 
            </div>
            <div className="header-items">
                <div>Aantal ritten <span className="number">{stravaData.total_ride_count}</span></div>
                <div>Totale afstand <span className="number">{stravaData.total_distance}KM</span></div>
                <div>Grootste afstand <span className="number">{stravaData.biggest_distance}KM</span></div>
                <div>Totale stijging <span className="number">{stravaData.elevation_gain}M</span></div>
                <div>Totale beweegtijd <span className="number">{stravaData.moving_time}</span></div>

            </div>
            <div className="main-map">
                <Map activityData={stravaData.activity_data}></Map>
            </div>
        </div>
    )
}

export default VisualizeData