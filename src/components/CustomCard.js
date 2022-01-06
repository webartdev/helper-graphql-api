import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from 'react-router-dom';
import Grid from "@material-ui/core/Grid"
import { Icon } from "@material-ui/core"

const muiBaseTheme = createMuiTheme();

const theme = {
  overrides: {
    MuiCard: {
      root: {
        "&.MuiEngagementCard--01": {
          transition: "0.3s",
          maxWidth: 300,
          margin: "auto",
          boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
          "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
          },
          "& .MuiCardMedia-root": {
            paddingTop: "56.25%"
          },
          "& .MuiCardContent-root": {
            textAlign: "left",
            padding: muiBaseTheme.spacing.unit * 3
          },
          "& .MuiDivider-root": {
            margin: `${muiBaseTheme.spacing.unit * 3}px 0`
          },
          "& .MuiTypography--heading": {
            fontWeight: "bold"
          },
          "& .MuiTypography--subheading": {
            lineHeight: 1.8
          },
          "& .MuiAvatar-root": {
            display: "inline-block",
            border: "2px solid white",
            "&:not(:first-of-type)": {
              marginLeft: -muiBaseTheme.spacing.unit
            }
          }
        }
      }
    }
  }
};

function CustomCard(props) {
  const { card } = props
  const navigate = useNavigate();
  const sendSubmit = () => {
    navigate(card.url);
};
  return (
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <Grid item xs={12} sm={6} md={4} lg={3} key={card.name}>
        <Card
          className={"MuiEngagementCard--01"}
          onClick={sendSubmit}
          style={{cursor: "pointer"}}
        >
          {/* <CardMedia
            image={card.image}
          /> */}
          <CardContent>
            <Typography
              className={"MuiTypography--heading"}
              variant={"h6"}
              gutterBottom
            >
              {card.name}
            </Typography>
            <Typography
              className={"MuiTypography--subheading"}
              variant={"caption"}
            >
              <Icon>{card.icon}</Icon>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </MuiThemeProvider>

  );
}

export default CustomCard
