import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useImmerReducer } from "use-immer";
import StateContext from "../context/StateContext";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import userImage from "../assets/images/userimage.png";

const baseUrl = "https://8000-dee68-ilx-m1qv6b8vv9s.ws-eu104.gitpod.io/api";
//const baseUrl = "https://ilx-3022db9b1ed6.herokuapp.com/api";

const ProfileUpdate = (props) => {
  const initialState = {
    firstNameValue: props.userProfile.firstName,
    lastNameValue: props.userProfile.lastName,
    phoneNumberValue: props.userProfile.phoneNumber,
    addressValue: props.userProfile.address,
    cityValue: props.userProfile.city,
    countyValue: props.userProfile.county,
    avatarValue: props.userProfile.avatar,
    postcodeValue: props.userProfile.postcode,
    uploadedPic: [],
    profileAvatar: props.userProfile.avatar,
    openSnack: false,
    sendRequest: 0,
    phoneNumberErrors: {
      hasErrors: false,
      errorMessage: "This field must not be empty",
    },
  };
  //console.log("props", props.userProfile);
  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchFirstNameChange":
        draft.firstNameValue = action.firstNameChosen;
        break;
      case "catchLastNameChange":
        draft.lastNameValue = action.lastNameChosen;
        break;
      case "catchPhoneNumberChange":
        draft.phoneNumberValue = action.phoneNumberChosen;
        break;
      case "catchAddressChange":
        draft.addressValue = action.addressChosen;
        break;
      case "catchCityChange":
        draft.cityValue = action.cityChosen;
        break;
      case "catchCountyChange":
        draft.countyValue = action.countyChosen;
        break;
      case "catchPostCodeChange":
        draft.postcodeValue = action.postCodeChosen;
        break;
      case "catchProfileUpload":
        draft.uploadedPic = action.picChosen;
        break;
      case "catchProfileAvatarChange":
        draft.profileAvatar = action.profileAvatarChosen;
        break;
      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;
      case "catchPhoneNumberError":
        if (action.phoneValueChosen.length === 0) {
          draft.phoneNumberErrors.hasErrors = true;
          draft.phoneNumberErrors.errorMessage =
            "This field must not be empty!";
        } else if (!/^\+(353|44)(\s*\d){9}$/.test(action.phoneValueChosen)) {
          draft.phoneNumberErrors.hasErrors = true;
          draft.phoneNumberErrors.errorMessage =
            "This phone number should start with +353 and must not be more than 13 digits";
        }
        break;
      case "openTheSnack":
        draft.openSnack = true;
        break;
      default:
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);
  const GlobalState = useContext(StateContext);
  const textFieldType = { marginBottom: "10px" };
  const navigate = useNavigate();

  //Get profile avatar change
  useEffect(() => {
    if (state.uploadedPic[0]) {
      dispatch({
        type: "catchProfileAvatarChange",
        profileAvatarChosen: state.uploadedPic[0],
      });
    }
  }, [state.uploadedPic[0]]);

  const counties = [
    { name: "CORK" },
    { name: "GALWAY" },
    { name: "DONEGAL" },
    { name: "MAYO" },
    { name: "KERRY" },
    { name: "TIPPERARY" },
    { name: "CLARE" },
    { name: "TYRONE" },
    { name: "ANTRIM" },
    { name: "LIMERICK" },
    { name: "ROSCOMMON" },
    { name: "DOWN" },
    { name: "WEXFORD" },
    { name: "MEATH" },
    { name: "LONDONDERRY" },
    { name: "KILKENNY" },
    { name: "WICKLOW" },
    { name: "OFFALY" },
    { name: "CAVAN" },
    { name: "WATERFORD" },
    { name: "WESTMEATH" },
    { name: "SLIGO" },
    { name: "LAOIS" },
    { name: "KILDARE" },
    { name: "FERMANAGH" },
    { name: "LEITRIM" },
    { name: "ARMAGH" },
    { name: "MONOGHAN" },
    { name: "LONGFORD" },
    { name: "DUBLIN" },
    { name: "CARLOW" },
    { name: "LOUTH" },
  ];

  const cities = [
    { name: "Dublin" },
    { name: "FinglasDublin" },
    { name: "Cork" },
    { name: "Tallaght" },
    { name: "Galway" },
    { name: "Limerick" },
    { name: "Lucan" },
    { name: "Waterford" },
    { name: "Clondalkin" },
    { name: "Drogheda" },
    { name: "Dún Dealgan" },
    { name: "Swords" },
    { name: "Navan" },
    { name: "Blackrock" },
    { name: "Douglas" },
    { name: "Ennis" },
    { name: "Carlow" },
    { name: "Dunleary" },
    { name: "Tralee" },
    { name: "Ashtown" },
    { name: "Kilkenny" },
    { name: "Port Laoise" },
    { name: "Naas" },
    { name: "Baile Átha Luain" },
    { name: "Mullingar" },
    { name: "Celbridge" },
    { name: "Wexford" },
    { name: "Letterkenny" },
    { name: "Sligo" },
    { name: "Ballincollig" },
    { name: "Greystones" },
    { name: "Rathfarnham" },
    { name: "Clonmel" },
    { name: "Carrigaline" },
    { name: "Leixlip" },
    { name: "Tullamore" },
    { name: "Maigh Nuad" },
    { name: "Killarney" },
    { name: "Arklow" },
    { name: "Glencullen" },
    { name: "Midleton" },
    { name: "Cobh" },
    { name: "Castlebar" },
    { name: "Enniscorthy" },
    { name: "Palmerston" },
    { name: "An Cabhán" },
    { name: "Wicklow" },
    { name: "Tramore" },
    { name: "Na Sceirí" },
    { name: "Longford" },
    { name: "Gorey" },
    { name: "Athy" },
    { name: "Ráth Tó" },
    { name: "Rush" },
    { name: "Shannon" },
    { name: "Nenagh" },
    { name: "Glanmire" },
    { name: "Tuam" },
    { name: "New Ross" },
    { name: "Dungarvan" },
    { name: "Youghal" },
    { name: "Thurles" },
    { name: "Lusca" },
    { name: "Monaghan" },
    { name: "Kildare" },
    { name: "Donabate" },
    { name: "Edenderry" },
    { name: "Clane" },
    { name: "Buncrana" },
    { name: "Carrigtohill" },
    { name: "Ballinasloe" },
    { name: "Fermoy" },
    { name: "Westport" },
    { name: "Kilcock" },
    { name: "Carrickmines" },
    { name: "Ros Comáin" },
    { name: "Sallins" },
    { name: "Passage West" },
    { name: "Carrick-on-Suir" },
    { name: "Dunboyne" },
    { name: "Loughrea" },
    { name: "Blessington" },
    { name: "Roscrea" },
    { name: "Carraig Mhachaire Rois" },
    { name: "Oranmore" },
    { name: "Tipperary" },
    { name: "Baile Átha Fhirdhia" },
    { name: "Kinsale" },
    { name: "Ballybofey" },
    { name: "Listowel" },
    { name: "Mountmellick" },
    { name: "Tullow" },
    { name: "Athenry" },
    { name: "Rathcoole" },
    { name: "Monasterevin" },
    { name: "Kilcoole" },
    { name: "Damhliag" },
    { name: "Gweedore" },
    { name: "Carrick on Shannon" },
    { name: "Dunshaughlin" },
    { name: "Bandon" },
    { name: "Mulhurddart" },
    { name: "Macroom" },
    { name: "Mitchelstown" },
    { name: "Kilcullen" },
    { name: "Claremorris" },
    { name: "Riverchapel" },
    { name: "Castleblayney" },
    { name: "Caher" },
    { name: "Courtown" },
    { name: "Rathnew" },
    { name: "Stamullin" },
    { name: "Saggart" },
    { name: "Delgany" },
    { name: "Gort" },
    { name: "Cashel" },
    { name: "Newtown Mount Kennedy" },
    { name: "Ballinrobe" },
    { name: "Skibbereen" },
    { name: "Togher" },
    { name: "An Móta" },
    { name: "Kinnegad" },
    { name: "Bantry" },
    { name: "Kilrush" },
    { name: "Coill an Chollaigh" },
    { name: "Ballyjamesduff" },
    { name: "Sixmilebridge" },
    { name: "Donegal" },
    { name: "Crosshaven" },
    { name: "Blarney" },
    { name: "Dún An Ri" },
    { name: "Castleisland" },
    { name: "Carndonagh" },
    { name: "Thomastown" },
    { name: "Athboy" },
    { name: "Ballyhaunis" },
    { name: "Ballyshannon" },
    { name: "Killorglin" },
    { name: "Kenmare" },
    { name: "Clogherhead" },
    { name: "Baltinglass" },
    { name: "Castleconnell" },
    { name: "Meathas Troim" },
    { name: "Leopardstown" },
    { name: "Dingle" },
    { name: "Abbeyfeale" },
    { name: "Barna" },
    { name: "Castlerea" },
    { name: "Tobercurry" },
    { name: "Bunclody" },
    { name: "Bundoran" },
    { name: "Templemore" },
    { name: "Enniskerry" },
    { name: "Baile Uí Mhatháin" },
    { name: "Ballybunnion" },
    { name: "Cootehill" },
    { name: "Castlebridge" },
    { name: "Ballivor" },
    { name: "Ballaghaderreen" },
    { name: "Dunmore East" },
    { name: "Cloyne" },
    { name: "Newmarket on Fergus" },
    { name: "Mountrath" },
    { name: "Abbeyleix" },
    { name: "Rathcormack" },
    { name: "Banagher" },
    { name: "Strandhill" },
    { name: "Portlaw" },
    { name: "Moycullen" },
    { name: "Kilmallock" },
    { name: "Dunmanway" },
    { name: "Lifford" },
    { name: "Collooney" },
    { name: "Derrinturn" },
    { name: "Castlemartyr" },
    { name: "Tearmann Feichín" },
    { name: "Ballymote" },
    { name: "Portraine" },
    { name: "Clifden" },
    { name: "Caherconlish" },
    { name: "Castledermot" },
    { name: "Graiguenamanagh" },
    { name: "Droichead Chaisleán Loiste" },
    { name: "Manorhamilton" },
    { name: "Portumna" },
    { name: "Rathkeale" },
    { name: "Ardnacrusha" },
    { name: "Belturbet" },
    { name: "Swinford" },
    { name: "Moroe" },
    { name: "Slane" },
    { name: "Ballysadare" },
    { name: "Stradbally" },
    { name: "Watergrasshill" },
    { name: "Béal Átha Ghártha" },
    { name: "Foxford" },
    { name: "Cill Bheagáin" },
    { name: "Killybegs" },
    { name: "Rathdowney" },
    { name: "Kilpedder" },
    { name: "Claregalway" },
    { name: "Ballybay" },
    { name: "Piltown" },
    { name: "Dromiskin" },
    { name: "Ferbane" },
    { name: "Athgarvan" },
    { name: "Mooncoin" },
    { name: "Dunglow" },
    { name: "Inishcrone" },
    { name: "Askeaton" },
    { name: "Adare" },
    { name: "Baile an Ghearlánaigh" },
    { name: "Ballylynan" },
    { name: "Raphoe" },
    { name: "Ballyragget" },
    { name: "Newtown Cunningham" },
    { name: "Daingean" },
    { name: "Kiltamagh" },
    { name: "Kilworth" },
    { name: "Crossmolina" },
    { name: "Kilmacanoge" },
    { name: "Cahersiveen" },
    { name: "Urlingford" },
    { name: "Kinlough" },
    { name: "Aghada" },
    { name: "Kilmeage" },
    { name: "Coolaney" },
    { name: "Headford" },
    { name: "Kilkee" },
    { name: "Buttevant" },
    { name: "Drommahane" },
    { name: "Roundwood" },
    { name: "Rathvilly" },
    { name: "Borrisokane" },
    { name: "Tinahely" },
    { name: "Kilcormac" },
    { name: "Droim Lis" },
    { name: "Béal an Átha Móir" },
    { name: "Inishannon" },
    { name: "Killeagh" },
    { name: "Collann" },
    { name: "Ballymore Eustace" },
    { name: "Mohill" },
    { name: "Patrickswell" },
    { name: "Dunlavin" },
    { name: "Milltown Malbay" },
    { name: "Lisdoonvarna" },
    { name: "Passage East" },
    { name: "Belgooly" },
    { name: "Clonee" },
    { name: "Glenties" },
    { name: "Gowran" },
    { name: "Bruff" },
    { name: "An Lios Breac" },
    { name: "Mount Bellew Bridge" },
    { name: "Craughwell" },
    { name: "Kilmacrenan" },
    { name: "Ardfert" },
    { name: "Ballyconnell" },
    { name: "Bennettsbridge" },
    { name: "Kinvarra" },
    { name: "Avoca" },
    { name: "Holycross" },
    { name: "Cloonlara" },
    { name: "Kildalkey" },
    { name: "Emyvale" },
    { name: "Skull" },
    { name: "Calverstown" },
    { name: "Cappoquin" },
    { name: "Johnstown Bridge" },
    { name: "Crinkill" },
    { name: "Borrisoleigh" },
    { name: "Manorcunningham" },
    { name: "Tallanstown" },
    { name: "Knockbridge" },
    { name: "Carlanstown" },
    { name: "Clonmellon" },
    { name: "Tulla" },
    { name: "Ladysbridge" },
    { name: "Kilmessan" },
    { name: "Killenaule" },
    { name: "Pallaskenry" },
    { name: "Kilrane" },
    { name: "Shinrone" },
    { name: "Rosbercon" },
    { name: "Cappamore" },
    { name: "Cloghjordan" },
    { name: "Glanworth" },
    { name: "Omeath" },
    { name: "Pettigoe" },
    { name: "Fahan" },
    { name: "Bruree" },
    { name: "Aherla" },
    { name: "Naul" },
    { name: "Clonaslee" },
    { name: "Kilkishen" },
    { name: "Fieries" },
    { name: "Crusheen" },
    { name: "Ballymurn" },
    { name: "Ballycanew" },
    { name: "Dromahair" },
    { name: "Mullinahone" },
    { name: "Ballycotton" },
    { name: "Rathmullan" },
    { name: "Mountcharles" },
    { name: "Ballinderreen" },
    { name: "Slieveroe" },
    { name: "Bellanode" },
    { name: "Oldtown" },
    { name: "Drimoleague" },
    { name: "Campile" },
    { name: "Ballinakill" },
    { name: "Kilmihil" },
    { name: "Garristown" },
    { name: "Ballincar" },
    { name: "Ventry" },
    { name: "Clondulane" },
    { name: "Rockcorry" },
    { name: "Ármhach" },
    { name: "Ballybrittas" },
    { name: "Coolgreany" },
    { name: "Fiddown" },
    { name: "Goresbridge" },
    { name: "Kildorrery" },
    { name: "Nobber" },
    { name: "Cappagh White" },
    { name: "Farran" },
    { name: "Riverstown" },
    { name: "Aglish" },
    { name: "Ballintogher" },
    { name: "Fedamore" },
    { name: "Newbliss" },
    { name: "Ballyporeen" },
    { name: "Ballylanders" },
    { name: "Durrus" },
    { name: "Emly" },
    { name: "Dunfanaghy" },
    { name: "Kilronan" },
    { name: "Knockvicar Bridge" },
    { name: "Myshall" },
    { name: "Castlemagner" },
    { name: "Inis Caoin" },
    { name: "Killavullen" },
    { name: "Tullaghan" },
    { name: "Trim" },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
    dispatch({ type: "changeSendRequest" });
  };
  // update profile
  useEffect(() => {
    if (state.sendRequest) {
      async function UpdateProfile() {
        const formData = new FormData();
        if (
          typeof state.profileAvatar === "string" ||
          typeof state.profileAvatar === null
        ) {
          formData.append("first_name", state.firstNameValue);
          formData.append("last_name", state.lastNameValue);
          formData.append("phone_number", state.phoneNumberValue);
          formData.append("street_address1", state.addressValue);
          formData.append("city", state.cityValue);
          formData.append("county", state.countyValue);
          formData.append("postcode", state.postcodeValue);
          formData.append("user", GlobalState.userId);
        } else {
          formData.append("first_name", state.firstNameValue);
          formData.append("last_name", state.lastNameValue);
          formData.append("phone_number", state.phoneNumberValue);
          formData.append("street_address1", state.addressValue);
          formData.append("city", state.cityValue);
          formData.append("county", state.countyValue);
          formData.append("postcode", state.postcodeValue);
          formData.append("avatar", state.profileAvatar);
          formData.append("user", GlobalState.userId);
        }

        try {
          const response = await axios.patch(
            `${baseUrl}/profiles/${GlobalState.userId}/update/`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
              },
            }
          );
          console.log(response.data);
          dispatch({ type: "openTheSnack" });
          //navigate(0);
        } catch (error) {
          console.log(error.response);
        }
      }
      UpdateProfile();
    }
  }, [state.sendRequest]);

  const ProfileAvatarDisplay = () => {
    if (typeof state.profileAvatar !== "string") {
      return (
        <Grid
          item
          xs={8}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: "3rem",
          }}
        >
          <ul>
            {state.profileAvatar ? <li>{state.profileAvatar.name}</li> : ""}
          </ul>
        </Grid>
      );
    } else if (typeof state.profileAvatar === "string") {
      return (
        <Grid
          item
          xs={8}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: "3rem",
          }}
        >
          <img
            src={props.userProfile.avatar}
            width={"25rem"}
            height={"25rem"}
            alt={state.profileAvatar.name}
          />
        </Grid>
      );
    }
  };

  console.log("props", props);
  //success message before redirect
  useEffect(() => {
    if (state.openSnack) {
      setTimeout(() => {
        navigate(0);
      }, 2500);
    }
  }, [state.openSnack]);

  return (
    <>
      <div></div>
      <div>
        <Grid>
          <Paper
            elevation={20}
            sx={{
              margin: "15px auto",
              width: { xs: "100%", sm: "100%", md: "60%" },
              padding: "30px",
              border: "2px solid #feb55f",
            }}
          >
            <Grid align="center" sx={{ marginBottom: "10px" }} item xs={12}>
              <Typography variant="h4">Profile Update</Typography>
            </Grid>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container justifyContent={"space-between"} spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="firstName"
                    name="firstname"
                    type="text"
                    variant="filled"
                    value={state.firstNameValue}
                    placeholder="First Name"
                    style={textFieldType}
                    onChange={(e) =>
                      dispatch({
                        type: "catchFirstNameChange",
                        firstNameChosen: e.target.value.trim(),
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="lastName"
                    name="lastname"
                    type="text"
                    variant="filled"
                    value={state.lastNameValue}
                    placeholder="Last Name"
                    style={textFieldType}
                    onChange={(e) =>
                      dispatch({
                        type: "catchLastNameChange",
                        lastNameChosen: e.target.value.trim(),
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent={"space-between"} spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    variant="filled"
                    value={state.phoneNumberValue}
                    placeholder="Phone Number"
                    style={textFieldType}
                    //required
                    onChange={(e) =>
                      dispatch({
                        type: "catchPhoneNumberChange",
                        phoneNumberChosen: e.target.value.trim(),
                      })
                    }
                    onBlur={(e) =>
                      dispatch({
                        type: "catchPhoneNumberError",
                        phoneValueChosen: e.target.value.trim(),
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    type="text"
                    variant="filled"
                    value={state.addressValue}
                    placeholder="Enter your addres here."
                    defaultValue={""}
                    style={textFieldType}
                    onChange={(e) =>
                      dispatch({
                        type: "catchAddressChange",
                        addressChosen: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent={"center"}>
                {ProfileAvatarDisplay()}
                <Grid item xs={4}></Grid>
              </Grid>
              <Grid
                container
                justifyContent={"center"}
                alignItems="center"
                spacing={2}
                sx={{ marginBottom: "10px", marginTop: "10px" }}
              >
                <Grid item xs={8}>
                  <Button
                    variant="contained"
                    fullWidth
                    component="label"
                    sx={{
                      backgroundColor: "#feb55f",
                      "&:hover": {
                        backgroundColor: "#000",
                        color: "feb55f",
                      },
                    }}
                  >
                    Upload Avatar
                    <input
                      type="file"
                      accept="image/png, image/gif, image/jpeg, image/jpg"
                      name="avatar"
                      id="avatar"
                      hidden
                      onChange={(e) =>
                        dispatch({
                          type: "catchProfileUpload",
                          picChosen: e.target.files,
                        })
                      }
                    />
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="postcode"
                    name="postcode"
                    type="text"
                    variant="filled"
                    value={state.postcodeValue}
                    placeholder="Post Code"
                    style={textFieldType}
                    onChange={(e) =>
                      dispatch({
                        type: "catchPostCodeChange",
                        postCodeChosen: e.target.value.trim(),
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent={"space-between"}
                spacing={2}
                sx={{ marginBottom: "10px", marginTop: "10px" }}
              >
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="county"
                    name="county"
                    type="text"
                    variant="filled"
                    value={state.countyValue}
                    placeholder="Enter your county"
                    select
                    defaultValue={""}
                    style={textFieldType}
                    required
                    onChange={(e) =>
                      dispatch({
                        type: "catchCountyChange",
                        countyChosen: e.target.value,
                      })
                    }
                  >
                    {counties.map((county, index) => (
                      <MenuItem key={index} value={county.name}>
                        {county.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="city"
                    name="city"
                    type="text"
                    variant="filled"
                    value={state.cityValue}
                    placeholder="Enter your city"
                    select
                    defaultValue={""}
                    style={textFieldType}
                    required
                    onChange={(e) =>
                      dispatch({
                        type: "catchCityChange",
                        cityChosen: e.target.value,
                      })
                    }
                  >
                    {cities.map((city, index) => (
                      <MenuItem key={index} value={city.name}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <Button
                variant="contained"
                fullWidth
                style={textFieldType}
                type="submit"
                sx={{
                  backgroundColor: "#feb55f",
                  color: "white",
                  "&:hover": { backgroundColor: "black", color: "#feb55f" },
                }}
              >
                Update Profile
              </Button>
            </form>
          </Paper>
        </Grid>
        <Snackbar
          open={state.openSnack}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success">
            You have successfully updated your profile!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default ProfileUpdate;
