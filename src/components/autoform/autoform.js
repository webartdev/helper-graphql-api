import Grid from "@material-ui/core/Grid"
import { CustomButton } from "./fields/CustomButton"
import { CustomTextField } from "./fields/CustomTextField"
import { CustomSelectField } from "./fields/CustomSelectField"
//#endregion
export const CustomField = ({ fieldType, ...fieldProps }) => {
    switch (fieldType) {
        case "button":
            return <CustomButton {...fieldProps.fieldProps} />
        case "select":
            return <CustomSelectField {...fieldProps} />
        default:
                return <CustomTextField {...fieldProps} />
    }
}
//#endregion
function Autoform(props) {
  const { formik, gridContainer, itemProps,  fieldDefaults, gridDefaults } = props;
  return(
      <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} {...gridContainer}>
              {itemProps?.map(({gridItem, fieldType, ...fieldProps}, index) => {
                  return(
                      <Grid key={index} item {...gridDefaults} {...gridItem}>
                          <CustomField
                           formik={formik}
                           fieldDefaults={fieldDefaults}
                           fieldProps={fieldProps}
                           fieldType={fieldType}
                          />
                      </Grid>
                  )
              })}
          </Grid>
      </form>
  )
}
//#endregion
export default Autoform