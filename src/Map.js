import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import { decode, encode } from "@googlemaps/polyline-codec";
import { useEffect, useState } from "react";

const positionDefault = [52.09083, 5.12222];
const zoom = 10;

const Map = (props) => {
    var encodedPolylines = [
        "k{g`I{i{[sDjOiAbDe@LiE_DeAxCeGtDuArCa@hDaCxI_@j@iHpCmMd@nCjc@XfIKfAcDrLkAjGaAfKJdIq@`Lk@bBqDnDqGmAg@VaPjcAe@LwZmEgDZoEu@{@|NcAvCuBpAwIy@U`a@oDPIlBwClNFnF}C~ZuBzGkDhW@xJVbBv@pBrFdGSf@LbBOtAuEdM]|BG|DHdDdIhs@t@lEhBpFi@jCeBtAGvBYt@uCzAyDe@cF|Es@RmGmB}BBiBkCaAoJ}AuCuCgC{AmFcBoDaB_Va@oOyAoIyCqMfAaKnAyDAkEZoB_CkA_GWcA}@k@kAUeBOmIuDm_@uByK|EyGPwKcB}Es@oE]{@u@k@}AEgD_BkAwAs@cCiAgBoBcAI{@MaFRuCj@kBlBoBbBUtEtCfD`@|AgA|CaByBfAYIu@mDaCwGeCqByAsD_DeFy@RcH}OuAwBaBb@{@pA}@pCeChBgCi@kDwB}Bc@iCeEqB?_FsAKl@gOse@eBzB_DtAwBxBoFxCgAwCaAsEc@MiIrLYp@Dj@vDfMG`@mB|BxClJfB`Ix@zBhCcLz@wApA_@pGpCfAO`GsFpDmEzAuCfAmDtB_CN}@AeClAYpFrElCfDrIfUAZj@LbBiAtAiDrAiBfAOh@`@bEpJfDdGT@pBvERR|@e@jAdDzC~BFx@fBjEPjASPf@vBWr@y@\\yDg@cFmCcBh@sBlCg@dCAfClB`R]nCJbEi@fBCjDTdDs@lFaFxAa@z@lAjQ_ANwA]_Dp@gBaCmCiBcAx@a@lCA|@R|@zB`D^lAf@pMbAhDjBnClIpBT`A|@x@r@BPm@]j@y@Aq@m@Mg@Fg@[`CEbEh@`Ds@fWsAPog@eCoJuEqB{B{A{@qKYaK}A{F_DwBqBBYz@fBz@l@bG`DfJnArLb@fDhDbJrErj@~Cd@~@KkFj@gQg@qE?aBf@}Hg@qHy@kE@oAl@_D?uDa@wImAaNZ_A~E}@R]b@mEQmEDcCd@{BEmEZuC[eEi@wDa@qF?oCf@sBvAcBlB{@~FtCbEZn@}@hMmI`DgEtGkKnFeM`AoDr@aAzCyBhIUIeF_@{C`AC`BoNdGcT~@QpA_BhAwGjA[JyBnA{GhQqA~@}@zFaLlA[PW@iAuAaAq@wDx@aEh@kFxEyN`B_CdDyC@oC|EoMr@cJ`AgDxA}BnFgFpC}E\\yExDeEtEiDbDzBbBq@vE_SH}AvBgJJsCi@qHdHoBtKeBtJqCrVsE",
        "yw{cIy{eg@u@rA_@^iJdF{@p@[^_CxDiAzB{AnDoBvFm@zBIp@]vEAdDT~HGpBSr@Cl@_@vAaCfLq@hCe@lCuEvTa@|@o@Vq@OkCsBe@m@oBuCkCyF{AkCe@q@O@KNc@vAk@tAY`@A^M`@_B~DIv@P|BB~@Lx@N\\P|B`@rCFx@Nn@Mh@MJMCMOe@iAk@y@q@_@[E}AXuAImLoA_Di@k@[oKkJ}GoGo@WqAGm@PmCxAm@b@Y\\uAfCk@rAiAvDMPa@R}TvEw[vGcMzBgThEwC^eBHuIQwDNaCe@{Wk@{BQaOoH}B}AoB_AOi@?[jDgtCBUHM~BIPa@BWp@yp@L_@VOzFgA\\[T_APQ@KEu@PaA?cBHyEEkAMaBQgAWcAwAyC]}Ac@uC_@oDy@yMOaIIuAQo@k@s@Qe@Im@[aE{@sCw@eFEiEWuEo@iEgAcLOsCAoDEiAm@wHKk@_AeBcAgC}A_CcBqBkC}A{I_IsBiA{E{D_@u@s@wCWa@e@i@sAy@gA}AyA}A]?[NkMhIaEtDeI|E_Ar@KBUQASHsCDaMFoC\\mH?eAKqE}@yGAcALoB?cAi@iFA{ABiAjJys@^}Ap@aCXeER}AT}@bBeE@_@Mc@yAqCsQwWgAsAoDmDoI{LaAiBCUBSb@yAXo@LO`@MIe@lCsGv@oAj@iCJ{AGsA{@sAI_@?SlA}EnA}FZs@l@u@\\s@Vy@x@aDx@aBnAgB~DoItGmJzA_CxBuBdEyEbDaDdCoCp@aAdEwErBgCfCsD`D_El@e@hBq@n@m@bD{DjFwG|DoFdA_AdBm@d@WzBsBtCkDd@ILWNgAdB{BnBiFHGJB^b@t@LXT|KjTxHrOfB`Dp_@dv@h@v@jIxPlC`FnPd\\lDlHpD~GfV~e@fCnFpXji@|AlCrBzE~BpEv@hA~HxOnTlb@vBtDx@YpCuAh@|@DTHjAHRnBxNn@dErF~a@A]DKj@SzHyE|Ay@hEaBR@VbD@p@In@?r@|@zGT|BjAjJp@fGDP?l@m@n@ER?ZNj@EPb@pD|B|Q~@jHr@nGN^d@d@FTLhAfB~EEd@F`@X^b@ChAhC?NEPWTeA`B?j@VjCj@jBj@fCt@~Bh@fCh@`DTt@h@lBpCtHrEnNLj@r@zGh@jDf@|EhBjNPj@b@j@Rb@PdA",
    ]; // FIXME these are dummy polylines

    const [encodedPolylinesState, setEncodedPolylinesState] = useState(encodedPolylines);
    const [decodedPolylinesState, setDecodedPolylinesState] = useState([]);
    const [position, setPosition] = useState(positionDefault);

    useEffect(() => {
        if (props.activityData) {
            var encodedPolylines = [];
            for (let polyline of props.activityData) {
                encodedPolylines.push(polyline.summary_polyline);
            } // Add each polyline found in activityData
        }
        setEncodedPolylinesState(encodedPolylines);

        if (decodedPolylinesState.length === 0) {
            var decodedPolylines = [];
            for (let encoded of encodedPolylinesState) {
                var latLongSequence = decode(encoded);
                decodedPolylines.push(latLongSequence);
            } // Decode the polylines to useable latlong sequences
            setDecodedPolylinesState(decodedPolylines);
        }
    }, [props.activityData, decodedPolylinesState]);

    useEffect(() => {
        if (decodedPolylinesState.length !== 0) {
            // FIXME center position not updated in MapContainer
            // var lastOuterArray =  decodedPolylinesState[decodedPolylinesState.length - 1];
            // var lastInnerArray = lastOuterArray[lastOuterArray.length - 1];
            // setPosition(lastInnerArray);
        }
    }, [decodedPolylinesState])

    return <Container position={position} decodedPolylines={decodedPolylinesState}></Container>;
};

const Container = (props) => {
    return (
        <MapContainer center={[props.position[0], props.position[1]]} zoom={zoom} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            />
            {props.decodedPolylines.map((route) => (
                <Polyline positions={route} color="red" />
            ))}
        </MapContainer>
    );
};

export default Map;
