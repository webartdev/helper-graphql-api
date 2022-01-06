import React from 'react'
import MaterialTable from 'material-table'
import { ExportPdf, ExportCsv } from "@material-table/exporters"
import Title from "./Title"

export const GeneralTable = (props) => {
    const { title, data, columns, options, ...rest } = props
    const _title = title || "Demo Table"
    const _data = data || []

    const tablePageSize = 10
    const styledTitle = <Title>{_title}</Title>

    const allRecords = { value: _data.length, label: 'All' }
    const defaultOptions = {
        columnsButton: true,
        exportAllData: true,
        sorting: true,
        filtering: true,
        grouping: true,
        padding: "dense",
        pageSize: tablePageSize,
        pageSizeOptions: [10, 25, 50, allRecords],
        // paginationPosition: "both",
        actionsColumnIndex: -1,
        addRowPosition: "first",
        awareOfUnicodeTokens: true,
        exportFileName: _title.replace(/ /g, "_"),
        exportMenu: [{
            label: "Export PDF",
            exportFunc: (cols, datas) => ExportPdf(cols, datas, "myPdfFileName")
        },
        {
            label: "Export CSV",
            exportFunc: (cols, datas) => ExportCsv(cols, datas, "myCsvFileName")
        }]
    }

    const _options = { ...defaultOptions, ...options}
    const _columns = columns || []


    return (
        <MaterialTable
            title={styledTitle}
            columns={_columns}
            options={_options}
            data={_data}
            {...rest}
        />
    )
}

export default GeneralTable
