![WiM](wimlogo.png)

# SPARROW Mississippi Nutrient Loading

SPARROW is a modeling tool for the regional interpretation of water-quality monitoring data. The model relates in-stream water-quality measurements to spatially referenced characteristics of watersheds, including contaminant sources and factors influencing terrestrial and aquatic transport. SPARROW empirically estimates the origin and fate of contaminants in river networks and quantifies uncertainties in model predictions. This application provides a flexible viewer to visualise SPARROW watershed models. For more information about Sparrow visit: [http://onlinelibrary.wiley.com/doi/10.1111/j.1752-1688.2011.00574.x/pdf](http://onlinelibrary.wiley.com/doi/10.1111/j.1752-1688.2011.00574.x/pdf)

### Prerequisites

This project is based on the USGS WiM Generator template for ESRI Javascript API web map applications. To work with the code you will need the following software:

- [Node Package Manager](https://www.npmjs.com/)
- [Git](https://desktop.github.com/)

```
npm install
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

To begin clone the repository from Github to your development machine.

```
git clone https://github.com/USGS-WiM/sparrow-mississippi-js.git
```

Change to the new newly created directory

```
cd sparrow-mississippi-js
```

Install dependencies using NPM

```
npm install
```

Install dependencies using bower

```
bower install
```

## Building and testing

The application uses [Gulp](https://gulpjs.com/) as a build system. You may need to install Gulp on your development machine.

```
 npm install -g gulp
```

To view and test the application locally run the 'gulp watch' command. A new browser window will open with a running version of the application.

```
 gulp watch
```

To create a build run:

```
 gulp build
```

## Troubleshooting the install and build

This application was developed using Nodejs 10.15. Starting at Node v11.x.x you will most likely have issues installing dependencies. This issue is documented [here](https://stackoverflow.com/questions/55921442/how-to-fix-referenceerror-primordials-is-not-defined-in-node)

The current workaround is to either use a Node Version Manager set to node 10.15 or downgrade your local version.

An alternative fix to quickly run the application without messing with your Node environment is to create a shrinkwrap.json file with the following code:

```
  {
      "dependencies": {
        "graceful-fs": {
            "version": "4.2.2"
         }
      }
    }
```

Then run

```
npm install
```

npm will overwite the shrinkwrap.json file and you will be able to run the code. This will allow the code to run locally, but is NOT a stable solution.

## Built With

- [jQuery](https://jquery.com/) - The main library used
- [ESRI Javascript API](https://developers.arcgis.com/javascript/) - Mapping API
- [Font Awesome](http://fontawesome.io/) - Scalable vector icons
- [NPM](https://www.npmjs.com/) - Dependency Management
- [Tablesorter](https://mottie.github.io/tablesorter/docs/) - HTML table sorting
- [HighCharts](https://www.highcharts.com/) - Interactive charting
- [Lobipanel](https://github.com/arboshiki/lobipanel) - jQuery plugin for bootstrap panels.
- [Bootstrap Select](https://silviomoreto.github.io/bootstrap-select/) - jQuery plugin to bring additional functionality to standard select elements.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on the process for submitting pull requests to us. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details on adhering by the [USGS Code of Scientific Conduct](https://www2.usgs.gov/fsp/fsp_code_of_scientific_conduct.asp).

## Updating the Application

Please read [UPDATING_SPARROW.md](UPDATING_SPARROW.md) for a checklist and description of how to add a new SPARROW model dataset or modify the application's configuration file.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](../../tags).

Advance the version when adding features, fixing bugs or making minor enhancement. Follow semver principles. To add tag in git, type git tag v{major}.{minor}.{patch}. Example: git tag v2.0.5

To push tags to remote origin: `git push origin --tags`

\*Note that your alias for the remote origin may differ.

## Authors

- **[Erik Myers](https://www.usgs.gov/staff-profiles/erik-s-myers)** - _Lead Developer_ - [USGS Web Informatics & Mapping](https://wim.usgs.gov/)

See also the list of [contributors](../../graphs/contributors) who participated in this project.

## License

This project is licensed under the Creative Commons CC0 1.0 Universal License - see the [LICENSE.md](LICENSE.md) file for details

## Suggested Citation

In the spirit of open source, please cite any re-use of the source code stored in this repository. Below is the suggested citation:

`This project contains code produced by the Web Informatics and Mapping (WIM) team at the United States Geological Survey (USGS). As a work of the United States Government, this project is in the public domain within the United States. https://wim.usgs.gov`

## About WIM

- This project authored by the [USGS WIM team](https://wim.usgs.gov)
- WIM is a team of developers and technologists who build and manage tools, software, web services, and databases to support USGS science and other federal government cooperators.
- WIM is a part of the [Upper Midwest Water Science Center](https://www.usgs.gov/centers/wisconsin-water-science-center).
