export function distributeData (data,row,setRowData) {
    if (!row || row == 0) return setRowData(null)

        data?.sort((a,b) => b.weight - a.weight) //sort data des
        let sortData = [...data]
        let rowData = []
        let totalWeightOfRowNumber = []

        for (let i=0;i < row; i++){ //put the largest data in every row
            rowData[i] = [sortData[0]]
            totalWeightOfRowNumber[i] = sortData[0].weight
            sortData.shift();
        }

        if (rowData.length === 1 ) {
            setRowData([[...data]])
            console.log(rowData)
        } else {
            for (let j=0;j < sortData.length; j++) { //put data into the smallest weight sum
                let smallestRow = 0
                let smallestTotalWeight = totalWeightOfRowNumber[0]
                for (let k = 1; k < rowData.length; k++) {
                    if (smallestTotalWeight > totalWeightOfRowNumber[k]) {
                        smallestTotalWeight = totalWeightOfRowNumber[k]
                        smallestRow = k
                    }
                }
                rowData[smallestRow] = [...rowData[smallestRow],sortData[j]]
                totalWeightOfRowNumber[smallestRow] = totalWeightOfRowNumber[smallestRow] + sortData[j].weight
            }
            setRowData(rowData)
            console.log(rowData) 
        }   
}