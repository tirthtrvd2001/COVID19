<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title>Home | COVID-19</title>
        <link rel="icon" href="images/fav-icon.png">
        
		<!-- Bootstrap CSS -->
        <link rel="stylesheet" href="css/bootstrap.css" type="text/css">
        <link rel="stylesheet" href="css/bootstrap-grid.min.css" type="text/css">
        <link rel="stylesheet" href="css/all.css" type="text/css">
        <link rel="stylesheet" href="css/Chart.css" type="text/css">
        <link rel="stylesheet" href="css/style.css" type="text/css">

		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn t work if you view the page via file:// -->
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
			<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
		<script src="js/jquery-3.4.1.min.js"></script>
		<script src="js/bootstrap.js"></script>
		<script src="js/Chart.bundle.min.js"></script>
		<script src="js/scroll-out.js"></script>
		<script src="js/main.js"></script>
	</head>
	<body>
	<!------------------- NAVBAR ------------------->
		<header>
		    <nav class="navbar px-md-0 navbar-expand-lg navbar-light bg-light" id="ftco-navbar">
                <div class="container-fluid d-flex justify-content-between">
                    <a href="index.html" class="navbar-brand">Corona</a>

                    <div class="collapse navbar-collapse" id="ftco-nav">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item"><a href="#master" class="nav-link active">Corona</a></li>
                            <li class="nav-item"><a href="#stats" class="nav-link">Statistics</a></li>
                            <li class="nav-item"><a href="#symptoms" class="nav-link">Symptoms</a></li>
                            <li class="nav-item"><a href="#prevention" class="nav-link">Prevention</a></li>
                            <li class="nav-item"><a href="#spread" class="nav-link">Spread</a></li>
                            <li class="nav-item"><a href="questions.html" class="nav-link">FAQs</a></li>

                        </ul>
                    </div>
                    <div class="navbar-access mr-0">
                        <li class="nav-item">
                            <button type="button" class="btn btn-white">Call - 1704</button>
                        </li>
                    </div>
                     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-expanded="false">
                        <span class="fas fa-bars"></span>
                    </button>
                </div>
            </nav>
		</header>
		
		
		<div class="container-fluid">
            <div class="top-section pt-lg-5">
                <div class="row align-items-center my-md-5 px-2 px-md-5 px-lg-0 pl-lg-5 block-1">
                    <div class="col-12 col-lg-6 d-flex flex-column justify-content-center px-lg-5 left">
                        <div class="main-heading font-theme-bold">Stay Home<br/>Stay Safe</div>
                        <span class="font-theme-med text">Coronavirus is a infectious diseases caused by new virus. <br/>There is no medicine to prevent or treat corona virus disease.</span>
                        <div class="mt-3 mt-sm-5 pb-4">
                        <button type="button" class="btn btn-red font-theme-semibold" data-href="#about-virus"><span>Know About Virus</span></button>
                        </div>
                    </div>
                    <div class="col-12 col-lg-6 d-flex align-items-center justify-content-center right">
                        <img src="images/Stayhome.png" width="85%">
                    </div>
                </div>
                <div class="stats-block mt-5 my-sm-5 my-md-0 my-lg-5 py-lg-5 px-4" id="stats">
                    <center class="pt-3">
                        <div class="heading h3 font-theme-bold color-theme mb-4"></div>
                        <div class="h5 font-theme-med">There are no medications specifically approved for coronavirus. <br/>Most people with mild coronavirus :
                        </div>
                    </center>
                    <div class="stats mt-5">
                        <div class="row mb-4 px-lg-5 px-xl-0 justify-content-center">
                            <select class="select col-12 col-lg-5 col-xl-4 mr-lg-5">
                                <optgroup label="India">
                                    <option selected>India</option>
                                    <option>Maharashtra</option>
                                    <option>Gujarat</option>
                                    <option>Kerala</option>
                                </optgroup>
                            </select>
                            <div class="search col-12 col-lg-5 col-xl-4 d-flex align-items-center ml-lg-5 mt-4 mt-lg-0 ">
                                <input type="text" class="form-control"/>
                            </div>
                        </div>
                        <div class="row justify-content-center align-items-stretch px-lg-5 px-xl-0">
                            <div class="graph col-xl-6 px-sm-4 px-md-5 py-3 mb-sm-5 mb-xl-0 mr-xl-5 d-flex flex-column align-items-center justify-content-center">
                                <div class="color-theme font-theme-bold d-sm-none">
                                    Total Cases
                                </div>
                                <div class="text-success font-theme-bold d-sm-none">
                                    Recovered
                                </div>
                                <div class="btn-wrap d-none d-md-flex justify-content-center mb-3 align-self-start">
                                    <button class="btn line mr-2 active">Line</button>
                                    <button class="btn bar">Bar</button>
                                </div>
                                <canvas id="line"></canvas>
                                <canvas id="bar"></canvas>
                                <canvas id="doughnut"></canvas>
                            </div>
                            <div class="case-info d-flex flex-xl-column col-xl-2 px-5 py-4 ml-xl-5 font-theme-semibold justify-content-around align-items-center">
                                <div>
                                    <small>Total Cases</small>
                                    <div class="h4 total"></div>
                                </div>
                                <div>
                                    <small class="text-warning">Active</small>
                                    <div class="h4 text-warning active"></div>
                                </div>
                                <div>
                                    <small class="text-success">Recovered</small>
                                    <div class="h4 text-success recovered"></div>
                                </div>
                                <div>
                                    <small class="text-danger text-left">Total Death</small>
                                    <div class="h4 text-danger deaths"></div>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
                <div class="row my-md-5 py-lg-5 px-md-5 px-lg-0 align-items-center block-2" id="about-virus">
                    <div class="col-12 col-lg-6 mt-5 mt-md-0">
                        <img src="images/about%20virus%20v2-01.png" width="100%">
                    </div>
                    <div class="col-12 col-lg-6 d-flex flex-column justify-content-center right px-lg-4 px-xl-5 mt-4 mt-md-0">
                        <h3 class="heading font-theme-bold color-theme mb-3 mb-md-5">What Is Novel Coronavirus (COVID-19)?</h3>
                        <div class="font-theme-med text">Novel coronavirus is an infectious disease caused by a new virus. The disease cause respiratory illness(like the flu) with symptoms such as cough, fever and in more severe cases difficulty in breathing. <br/><br/>
                        You can protect yourself by washing your hands frequently, avoid touching your face, avoid close contact with people who are unwell.
                        </div>
                        <div class="mt-3 mt-sm-5 pb-4">
                        <button type="button" class="btn btn-red font-theme-semibold" data-href="#symptoms"><span>Check Symptons</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row block-3 align-items-center my-5 py-md-5 px-md-5 px-lg-0 pl-lg-4" id="symptoms">
            <div class="col-12 col-lg-6 d-flex flex-column justify-content-center px-xl-5">
                <div class="heading h3 font-theme-bold color-theme mt-5 mt-lg-0 mb-md-5 pt-md-4">What are the SYMPTOMS ?</div>
                <div class="text">
                    <div class="mb-4 font-theme-med">COVID-19 symptoms range from mild to severe. It takes 2-14 days after exposure for symptoms to develop. Symptoms may include:</div>
                    <div class="row justify-content-start font-theme-bold pl-3">
                        <div class="mr-5">
                            <div class="h6">Fever</div>
                            <div class="h6">Hard Cough</div>
                            <div class="h6">Head Ache</div>
                        </div>
                        <div>
                            <div class="h6">Breating Problems</div>
                            <div class="h6">Kidney Failure</div>
                            <div class="h6">Respiratory Distress</div>
                        </div>
                    </div>
                </div>
                <div class="mt-3 mt-sm-5 pb-4">
                        <button type="button" class="btn btn-red font-theme-semibold" data-href="#prevention"><span>Check Preventions</span></button>
                    </div>
            </div>
            <div class="img-container col-12 col-lg-6 d-flex justify-content-center">
                <svg width="100%" viewbox="0 0 700 500" class="symptoms-svg">
                   <g>
                   <svg x="480" y="250" id="rotate-virus1">
                    <image href="images/corona.png" style="height: 20%; width: 20%;" opacity=".9"/>
                    </svg>
                    <image href="images/corona.png" class="rotate-virus2" style="height: 15%; width: 15%;" transform="translate(450, 410)" opacity=".7"/>
                    <image href="images/corona.png" class="rotate-virus3" style="height: 22%; width: 22%;" transform="translate(80, 270)" opacity=".9"/>
                    <image href="images/Symptoms%20v2-01.png" style="width: 100%; height: 100%;"/>
                    <polyline points="148,67 253,67 320,100" style="fill: none; stroke: rgb(200,50,65); stroke-width: 1.25; stroke-dasharray: 1000; stroke-dashoffset: 1000"/>
                    <polyline points="155,185 230,185 340,110" style="fill: none; stroke: rgb(200,50,65); stroke-width: 1.25; stroke-dasharray: 1000; stroke-dashoffset: 1000"/>
                    <polyline points="500,31 420,31 370,58" style="fill: none; stroke: rgb(200,50,65); stroke-width: 1.25; stroke-dasharray: 1000; stroke-dashoffset: 1000"/>
                    <polyline points="510,110 430,110 345,95" style="fill: none; stroke: rgb(200,50,65); stroke-width: 1.25; stroke-dasharray: 1000; stroke-dashoffset: 1000"/>
                    <polyline points="490,195 450,195 345,145" style="fill: none; stroke: rgb(200,50,65); stroke-width: 1.25; stroke-dasharray: 1000; stroke-dashoffset: 1000"/>
                    <circle cx="143" cy="67" r="5" fill="rgb(200,50,65)"/>
                    <circle cx="150" cy="185" r="5" fill="rgb(200,50,65)"/>
                    <circle cx="505" cy="31" r="5" fill="rgb(200,50,65)"/>
                    <circle cx="515" cy="110" r="5" fill="rgb(200,50,65)"/>
                    <circle cx="495" cy="195" r="5" fill="rgb(200,50,65)"/>
                    <circle cx="88" cy="67" r="30" fill="rgba(232,80,91,.15)"/>
                    <circle cx="106" cy="185" r="30" fill="rgba(232,80,91,.15)"/>
                    <circle cx="558" cy="31" r="30" fill="rgba(232,80,91,.15)"/>
                    <circle cx="576" cy="110" r="30" fill="rgba(232,80,91,.15)"/>
                    <circle cx="595" cy="195" r="30" fill="rgba(232,80,91,.15)"/>
                    <text x="45" y="73" fill="rgb(232,80,91)" style="font-family: 'spacegrotesk-bold'">HIGH FEVER</text>
                    <text x="80" y="192" fill="rgb(232,80,91)" style="font-family: 'spacegrotesk-bold'">COUGH
                    </text>
                    <text x="520" y="36" fill="rgb(232,80,91)" style="font-family: 'spacegrotesk-bold'">HEADACHE
                    </text>
                    <text x="530" y="116" fill="rgb(232,80,91)" style="font-family: 'spacegrotesk-bold'">RUNNY NOSE
                    </text>
                    <text x="515" y="201" fill="rgb(232,80,91)" style="font-family: 'spacegrotesk-bold'">RESPIRATORY DISTRESS
                    </text>
                    </g>
                </svg>
            </div>
            </div>
            <div class="block-4 mt-sm-5 pt-md-5 pt-md-0 mt-md-0 my-xl-5 py-xl-5" id="prevention">
                <center>
                    <div class="h2 heading font-theme-bold color-theme">How To Protect Yourself From COVID-19 ?</div>
                </center>
                <div class="row justify-content-around mt-md-5 pt-3 px-2 px-md-5 px-lg-0">
                    <div class="col-12 col-lg-5">
                        <div class="sub-heading font-theme-semibold">What You <span class="text-success">Should DO : </span></div>
                        <div class="row prevent-card mt-5 px-4 py-2 hvr-bob dos">
                            <div class="col-5 col-sm-4">
                                <img src="images/wear%20mask-01.png" width="100%">
                            </div>
                            <div class="col-7 col-sm-8 d-flex flex-column justify-content-center align-items-center font-theme-bold">
                                <div class="h5">WEAR</div>
                                <div class="h5">FACE MASK</div>
                            </div>
                        </div>
                        <div class="row prevent-card mt-5 px-4 py-2 hvr-bob dos">
                            <div class="col-5 col-sm-4">
                                <img src="images/use%20nose%20rag-01.png" width="100%">
                            </div>
                            <div class="col-7 col-sm-8 d-flex flex-column justify-content-center align-items-center font-theme-bold">
                                <div class="h5">COVER FACE</div>
                                <div class="h5">WHEN COUGHING</div>
                            </div>
                        </div>
                        <div class="row prevent-card mt-5 px-4 py-2 hvr-bob dos">
                            <div class="col-5 col-sm-4">
                                <img src="images/wash%20hands-01.png" width="100%">
                            </div>
                            <div class="col-7 col-sm-8 d-flex flex-column justify-content-center align-items-center font-theme-bold">
                                <div class="h5">WASH HANDS</div>
                                <div class="h5">FREQUENTLY</div>
                            </div>
                        </div>
                        <div class="row prevent-card mt-5 px-4 py-2 hvr-bob dos">
                            <div class="col-5 col-sm-4">
                                <img src="images/drink%20water-01.png" width="100%">
                            </div>
                            <div class="col-7 col-sm-8 d-flex flex-column justify-content-center align-items-center font-theme-bold">
                                <div class="h5">DRINK</div>
                                <div class="h5">MUCH WATER</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-5 mt-5 mt-lg-0">
                        <div class="sub-heading font-theme-semibold">What You <span class="text-danger">Should Not DO : </span></div>
                        <div class="row prevent-card mt-5 px-4 py-2 hvr-bob donts">
                            <div class="col-5 col-sm-4">
                                <img src="images/market-01.png" width="100%">
                            </div>
                            <div class="col-7 col-sm-8 d-flex flex-column justify-content-center align-items-center font-theme-bold donts">
                                <div class="h5">AVOID MARKET</div>
                                <div class="h5">AND CROWD</div>
                            </div>
                        </div>
                        <div class="row prevent-card mt-5 px-4 py-2 hvr-bob donts">
                            <div class="col-5 col-sm-4">
                                <img src="images/avoid%20touching%20face-01.png" width="100%">
                            </div>
                            <div class="col-7 col-sm-8 d-flex flex-column justify-content-center align-items-center font-theme-bold">
                                <div class="h5">AVOID TOUCHING</div>
                                <div class="h5">YOUR FACE</div>
                            </div>
                        </div>
                        <div class="row prevent-card mt-5 px-4 py-2 hvr-bob donts">
                            <div class="col-5 col-sm-4">
                                <img src="images/avoid%20animal-01.png" width="100%">
                            </div>
                            <div class="col-7 col-sm-8 d-flex flex-column justify-content-center align-items-center font-theme-bold">
                                <div class="h5">AVOID</div>
                                <div class="h5">ANIMAL CONTACT</div>
                            </div>
                        </div>
                        <div class="row prevent-card mt-5 px-4 py-2 hvr-bob donts">
                            <div class="col-5 col-sm-4">
                                <img src="images/seek%20medical%20help-01.png" width="100%">
                            </div>
                            <div class="col-7 col-sm-8 d-flex flex-column justify-content-center align-items-center font-theme-bold">
                                <div class="h5">HIDE FROM</div>
                                <div class="h5">MEDICAL CARE</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="block-5 mt-5 my-lg-5 py-5" id="spread">
                <center> 
                    <div class="heading font-theme-bold color-theme h3">How Does NOVEL CORONA Virus Spread?</div>
                </center>
                <div class="row mt-md-5 pt-md-4 justify-content-around px-4 px-sm-5">
                    <div class="col-10 col-md-5 col-lg-4 col-xl-3 d-flex flex-column align-items-center px-4 pb-5 mt-5 mt-md-0 spread-card hvr-bob">
                        <img src="images/Human%20Contact-01.png" width="90%"> 
                        <div class="card-heading color-theme font-theme-bold h4 mb-4 text-center">Personal Contact</div>
                        <div class="card-text font-theme-med text-center h6 px-3">Avoiding contact with others and visits to medical facilities will allow.</div>
                    </div>
                    <div class="col-10 col-md-5 col-lg-4 col-xl-3 d-flex flex-column align-items-center px-4 pb-5 mt-5 mt-md-0 spread-card hvr-bob">
                        <img src="images/Air%20transmission-01.png" width="90%"> 
                        <div class="card-heading color-theme font-theme-bold h4 mb-4 text-center">Air Transmission</div>
                        <div class="card-text font-theme-med text-center h6 px-3">Via respiratory droplets produced when infected person coughs or sneezes.</div>
                    </div>
                    <div class="col-10 col-md-5 col-lg-4 col-xl-3 d-flex flex-column align-items-center px-4 pb-5 mt-5 mt-lg-0 spread-card hvr-bob">
                        <img src="images/Contaminant%20object-01.png" width="90%"> 
                        <div class="card-heading color-theme font-theme-bold h4 mb-4 text-center">Contaminate Object</div>
                        <div class="card-text font-theme-med text-center h6 px-3">Call in advance and tell your provider of any recent travel or contact.</div>
                    </div>
                </div>
            </div>
            <center class="my-lg-5 py-5">
                <div class="book-test-block d-inline-block py-5">
                    <div class="font-theme-bold h1">
                    Want to test for COVID-19 ?
                    </div>
                    <div class="row d-flex justify-content-around justify-content-md-between mt-5">
                        <button class="btn btn-white mb-sm-4 mb-md-0">Call For Test</button>
                        <button class="btn btn-red"><span>Consult Doctor</span></button>
                    </div>
                </div>
            </center>
		</div>
		<script>
            
        </script>
	</body>
</html>
