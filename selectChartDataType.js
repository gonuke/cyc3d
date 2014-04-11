function selectChartDataType() {

    var parser = document.createElement("a");
    parser.href = document.URL;
    searchList = parser.search.substring(1).split("&");
    
    var dynamic = false;
    var chart_type = "chart";
    var data_type = "waste";
    
    for (var i=0;i<searchList.length;i++)
    {
        if (searchList[i] == "dynamic")
        {
            dynamic = true;
        }
        else if (searchList[i] == "info")
        {
            chart_type = searchList[i];
        }
        else if (searchList[i] == "cost")
        {
            data_type = searchList[i];
        }
    }
    
    for (var i=0;i<searchList.length;i++)
    {
        var divList = document.querySelectorAll("#" + searchList[i]);
        for (var j=0;j<divList.length;j++)
        {
            divList[j].style.display="block";
        }
    }

    if (chart_type == "chart")
    {
        chart(dynamic,data_type);
    }
    else
    {
        info(dynamic,data_type);
    }
    
}
