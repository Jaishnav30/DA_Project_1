"use client"; // Required for clipboard functionality

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // Dark theme
import Link from "next/link";
import { Home } from "lucide-react";
import "../../styles/codes.css"; // Import CSS file

const codeSnippets = [
    {
        title: "Basic imports and data loading",
        code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import plotly.express as px
import plotly.io as pio
import mpld3 

pio.renderers.default = "browser" 
df = pd.read_excel("space_missions.xlsx",sheet_name=0)
# encoding="ISO-8859-1"`,
        showPlotButton: false,
    },
    {
        title: "DataFrame Overview",
        code: `df.head()`,
        showPlotButton: false,
        showDataFrameButton: true,
    },
    {
        title: "Top 20 companies with highest space missions counts",
        code: `agency_list = list(df["Company"])
agency_set = set(df["Company"])
new_list = []

for i in agency_set:
    new_list.append([i,agency_list.count(i)])
    
new_sorted_list = sorted(new_list, key=lambda x: x[1], reverse=True)

comp_list = [new_sorted_list[i][0] for i in range(20)]
mission_cnt = [new_sorted_list[i][1] for i in range(20)]

for i in range(20):
    print((str(i+1)+".").ljust(3),new_sorted_list[i][0].ljust(30),new_sorted_list[i][1])`,
        showPlotButton: false,
    },

    {
        title: "Output",
        code: 
`1.  Russia (USSR)                  1777
2.  CNSA                           338
3.  ESA                            307
4.  Roscosmos                      285
5.  General Dynamics               251
6.  NASA                           203
7.  SpaceX                         182
8.  US Air Force                   161
9.  ULA                            151
10. Boeing                         136
11. Martin Marietta                114
12. JAXA                           95
13. Northrop                       89
14. ISRO                           82
15. Lockheed                       79
16. ILS                            46
17. Sea Launch                     36
18. ISAS                           30
19. Rocket Lab                     28
20. Kosmotras                      22`,
        showPlotButton: false,
    },

    {
        title: "Number of missions",
        code: 
`df['Date'] = pd.to_datetime(df['Date'], format="%d %m %Y")
df['Year'] = df['Date'].dt.year

missions_per_year = df['Year'].value_counts().sort_index()
df.head()

x_year = list(missions_per_year.index)    
y_missions = list(missions_per_year.values)

fig = px.line(
    x=x_year, 
    y=y_missions, 
    markers=True,
    labels={"x":"Year", "y":"Missions"},
    title="<b>Number of missions per year (1957-2022)</b>"
)

fig.update_layout(
    xaxis=dict(
        tickmode="linear",
        dtick=1, 
        range=[1956,2023]
    ),
    title_x=0.5, 
    title=dict(font=dict(family="Times New Roman", 
                         size=30, 
                         color="black"))
    # margin=dict(l=50, r=50, t=50, b=50)
)

fig.write_html("missions.html")`,
        plotUrl: "/plots/missions.html",
        showPlotButton: true,
    },

    {
        title: "Launch Centers Locations",
        code: 
`df_loc = pd.read_excel("space_missions.xlsx",sheet_name=1)

fig2 = px.scatter_mapbox(df_loc, 
                     lat="Latitude", 
                     lon="Longitude", 
                     text="Location",
                     zoom=1,
                     color_discrete_sequence=["#E10B0B"],
                     title="<b>Locations of Launch Centers around the world</b>",
                     mapbox_style="open-street-map")  

fig2.update_layout(margin=dict(l=10, r=10, t=50, b=10))
fig2.update_layout(
    title_x=0.5, 
    title=dict(font=dict(size=25, color="black"))
)

fig2.write_html("launch_centers_map.html")`,
        plotUrl: "/plots/launch_centers_map.html",
        showPlotButton: true,
    },

    {
        title: "Launch-Success Ratio",
        code:
`success_cnt = []

for i in range(20):
    cnt = 0
    for j in range(4630):
        if df["Company"][j] == comp_list[i] and df["MissionStatus"][j] == "Success":
            cnt += 1
    success_cnt.append(cnt)

null = [t-s for t,s in zip(mission_cnt, success_cnt)]

import plotly.graph_objects as go
from plotly.subplots import make_subplots

fig3 = make_subplots(rows=4, cols=5, subplot_titles=comp_list,  specs=[[{"type": "domain"}]*5]*4)

row, col = 1, 1 
for i in range(20):
    fig3.add_trace(go.Pie(
        labels=["Success", "Failure"],
        values=[success_cnt[i], null[i]],
        textinfo="percent",
        text=[f"{success_cnt[i]:0.2f}", ""],
        textposition=["inside", "none"],
        name=comp_list[i],
        hole=0.3,
        marker=dict(line=dict(color="black", width=1),
                    colors=["#2EEE4E", "red"])
    ), row=row, col=col)
    
    
    col += 1
    if col > 5:  
        col = 1
        row += 1

fig3.update_layout(title_text="<b>Total Launches to Success Ratio</b>",
                   title_x=0.5, 
                   title=dict(font=dict(size=25, color="black")))

fig3.write_html("subplots.html")`,
        plotUrl: "/plots/subplots.html",
        showPlotButton: true,
    },

    {
        title: "Total Expenditure of Agencies",
        code:
`data_dict = {
    "Company" : [],
    "Cost" : []
}

tmp_list = []
for j in comp_list:
    cost = df.loc[(df["Company"] == j) & df["Price"].notna(), "Price"].sum()
    tmp_list.append([j,cost])
    
tmp_list = sorted(tmp_list, key=lambda x:x[1], reverse=True)
data_dict["Company"] = [i[0] for i in tmp_list]
data_dict["Cost"] = [float("%.2f"%(i[1])) for i in tmp_list]

fig = px.bar(data_dict, x="Company", y="Cost", color="Cost", color_continuous_scale="Turbo")

fig.update_layout(
    title=dict(text="Total Expenditure of Agency (1957-2022)", x=0.5, font=dict(size=20, family="Arial", color="black")),
    plot_bgcolor="lightgray", paper_bgcolor="white",
    font=dict(family="Arial", size=14, color="black"),
    xaxis=dict(title="Agencies", tickangle=-45, showgrid=False),
    yaxis=dict(title="Cost in Million USD", showgrid=True, gridcolor="gray"),
    margin=dict(l=40, r=40, t=60, b=40)
)

fig.update_traces(text=data_dict["Cost"], textposition="outside")


fig.write_html("Total_expenditure.html")`,
        plotUrl: "/plots/Total_expenditure.html",
        showPlotButton: true,
    }

];

export default function CodesPage() {
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [expandedRows, setExpandedRows] = useState({});
  
    const copyToClipboard = (code, index) => {
      navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    };
  
    const toggleDataFrame = (index) => {
      setExpandedRows((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    };
  
    return (
      <div className="codes-page">
        <div className="container">
          <Link href="/" className="home-btn">
            <Home size={24} className="home-icon" />
            <span>Home</span>
          </Link>
          <h1 className="title">📜 Python Codes & Plot Analysis</h1>
  
          {codeSnippets.map((snippet, index) => (
            <div key={index} className="code-box">
              <h2 className="code-title">{snippet.title}</h2>
              <div className="code-content">
                <SyntaxHighlighter language="python" style={oneDark} wrapLongLines>
                  {snippet.code}
                </SyntaxHighlighter>
                <button onClick={() => copyToClipboard(snippet.code, index)} className="copy-btn">
                  {copiedIndex === index ? "✅ Copied!" : "📋 Copy"}
                </button>
              </div>

              {snippet.showPlotButton && (
                <a href={snippet.plotUrl} target="_blank" rel="noopener noreferrer" className="button-68">
                    🔍 View Plot Analysis
                </a>
              )}
  
              {snippet.showDataFrameButton && (
                <button onClick={() => toggleDataFrame(index)} className="view-df-btn">
                  {expandedRows[index] ? "🔽 Hide DataFrame" : "🔍 View DataFrame"}
                </button>
              )}
  
              {expandedRows[index] && (
                <div className={`dataframe-container ${expandedRows[index] ? "show" : ""}`}>
                  {expandedRows[index] && (
                    <table className="dataframe">
                        <thead>
                        <tr>
                            <th>Company</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Rocket</th>
                            <th>Mission</th>
                            <th>Rocket Status</th>
                            <th>Price</th>
                            <th>Mission Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Russia (USSR)</td>
                            <td>Site 1/5, Baikonur Cosmodrome, Kazakhstan</td>
                            <td>10/4/1957</td>
                            <td>7:27:40</td>
                            <td>Sputnik 8K71PS</td>
                            <td>Sputnik-1</td>
                            <td>Retired</td>
                            <td></td>
                            <td>Success</td>
                        </tr>
                        <tr>
                            <td>Russia (USSR)</td>
                            <td>Site 1/5, Baikonur Cosmodrome, Kazakhstan</td>
                            <td>11/3/1957</td>
                            <td>2:29:40</td>
                            <td>Sputnik 8K71PS</td>
                            <td>Sputnik-2</td>
                            <td>Retired</td>
                            <td></td>
                            <td>Success</td>
                        </tr>
                        <tr>
                            <td>US Navy</td>
                            <td>LC-18A, Cape Canaveral AFS, Florida, USA</td>
                            <td>12/6/1957</td>
                            <td>4:43:40</td>
                            <td>Vanguard</td>
                            <td>Vanguard TV3</td>
                            <td>Retired</td>
                            <td></td>
                            <td>Failure</td>
                        </tr>
                        <tr>
                            <td>AMBA</td>
                            <td>LC-26A, Cape Canaveral AFS, Florida, USA</td>
                            <td>2/1/1958</td>
                            <td>3:47:40</td>
                            <td>Juno I</td>
                            <td>Explorer 1</td>
                            <td>Retired</td>
                            <td></td>
                            <td>Success</td>
                        </tr>
                        <tr>
                            <td>US Navy</td>
                            <td>LC-18A, Cape Canaveral AFS, Florida, USA</td>
                            <td>2/5/1958</td>
                            <td>7:32:40</td>
                            <td>Vanguard</td>
                            <td>Vanguard TV3BU</td>
                            <td>Retired</td>
                            <td></td>
                            <td>Failure</td>
                        </tr>
                        </tbody>
                    </table>
                    )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
}

  