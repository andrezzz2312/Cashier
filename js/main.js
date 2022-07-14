// Variables
const loop = document.getElementById('loopvideo')
const loopContainer = document.getElementById('loop')
const videoHolder = document.querySelector('#videoHolder')
let video1 = ''
let video2 = ''
let video3 = ''
let textContent = ''
let label = ''
let labelCont = ''
let paragraph = ''
let line = ''
let svg1 = ''
let circle = ''
let backButton = ''
let backButtonContainer = ''
let containVideoWidth = ''
let containVideoHeight = ''
let video1check = false
let video2check = false
let video3check = false
let quickS = false
let pCont = ''
let list = ''
let x = window.matchMedia('(max-height: 550px)')
const mainButtons = document.querySelector('#mainButtons')
const showCont = document.querySelector('#showCont')
const svgContainer = document.querySelectorAll('.svgContainer')
const buttonContainer = document.querySelectorAll('.buttonContainer')
const mainContainer = document.querySelector('.container')
const mainMenuContainer = document.querySelector('#mainMenuContainer')
const loader = document.querySelector('.loader')
let currentVideo = 0
const initial = document.querySelector('.initial')
const warningText = document.querySelector('.warningText')
const warning = document.querySelector('.warning')
const expand = document.querySelector('#expand')
const contract = document.querySelector('#contract')
const close = document.querySelector('#close')
const alertdiv = document.querySelector('.alertdiv')
const modalalert = document.querySelector('.modalalert')
let details = navigator.userAgent
let regexp = /android|iphone|kindle|ipad/i
let ios = /iphone|ipad/i
let macosPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i
let isMobileDevice = regexp.test(details)
let isIOS = ios.test(details)
let isMac = macosPlatforms.test(details)

if (!isMobileDevice) {
	fullscreen_button.style.display = 'none'
} else {
	if (isIOS) {
		fullscreen_button.style.display = 'none'
	}
}
if (isMac) {
	alertdiv.style.display = 'flex'
}
// Set which videos are going to swap
function InterpolateVideo(videoToPause, videoToVanish, videoToPlay) {
	videoToPause.pause()
	videoToVanish.classList.add('short-vanish')
	setTimeout(() => {
		videoToPlay.play()
	}, 500)
}
// loop.currentTime = 60
// Vanish/show the main buttons and svgs
function HideShowMainButtons() {
	mainButtons.classList.toggle('show')
	mainButtons.classList.toggle('disabled')
	mainButtons.classList.toggle('vanish')
}

// Vanish/show when a main button is pressed
function HideShowCont() {
	showCont.classList.remove('hidden')
	showCont.classList.toggle('short-vanish')
	showCont.classList.toggle('show')
}
function animations() {
	labelCont.style.animation =
		'growtall 0.5s cubic-bezier(0.86, 0.01, 0.77, 0.18) forwards '
	label.style.animation = 'fadein 0.5s ease-in-out forwards'
	pCont.style.animation =
		'grow 0.5s cubic-bezier(0.86, 0.01, 0.77, 0.18) forwards'
	list.style.animation = 'fadein 0.5s ease-in-out forwards'
	labelCont.style.animationDelay = '0.5s'
	label.style.animationDelay = '1s'
	pCont.style.animationDelay = '1s'
	list.style.animationDelay = '1.5s'
}
// Create the video tags storaged in videoContainer div
function createVideos(source1, source2, source3) {
	if (source1) {
		video1 = document.createElement('video')
		video1.src = source1
		video1.setAttribute('muted', '')
		video1.setAttribute('playsinline', '')
		video1.setAttribute('poster', '')
		video1.controls = false
		video1.autoplay = 'true'
		video1.classList.add('video')
		video1.style.zIndex = '-2'
		video1.pause()
		loopContainer.appendChild(video1)
	}
	if (source2) {
		video2 = document.createElement('video')
		video2.src = source2

		video2.setAttribute('muted', '')
		video2.setAttribute('playsinline', '')
		video2.setAttribute('poster', '')
		video2.controls = false
		video2.autoplay = 'true'
		video2.classList.add('video')
		video2.style.zIndex = '-3'
		video2.pause()
		loopContainer.appendChild(video2)
	}
	if (source3) {
		video3 = document.createElement('video')
		video3.src = source3
		video3.setAttribute('muted', '')
		video3.autoplay = 'true'
		video3.setAttribute('playsinline', '')
		video3.setAttribute('poster', '')
		video3.controls = false
		video3.classList.add('video')
		video3.style.zIndex = '-4'
		video3.pause()
		loopContainer.appendChild(video3)
	}
}

// Create the content storaged in showCont div / Left and Top position of the container div, label title and content of the paragraph

// Create the svgs for the showCont div / 4 first parameters are the x and y points of the first and second point respectively, last 2 are the x and y points of the dot

function setFontSizes() {
	const button = document.querySelectorAll('.button')

	let fontvar = `calc(5px + (22 - 5) * ((${
		containVideoWidth + 'px'
	} - 320px) / (1440 - 320)))`

	for (let i = 0; i < button.length; i++) {
		button[i].style.fontSize = fontvar
	}
}

function checkVideos() {
	video1.addEventListener('playing', function () {
		currentVideo = 1
		console.log(currentVideo)
	})
	video2.addEventListener('playing', function () {
		currentVideo = 2
		console.log(currentVideo)
	})
	video3.addEventListener('playing', function () {
		currentVideo = 3
		console.log(currentVideo)
	})
}

function backButtonFunction() {
	ArreglarLineas()
	if (currentVideo === 1) {
		video2.remove()
		video3.remove()
		video1.classList.add('vanish')
		loop.style.zIndex = '-5'
		loop.currentTime = 0
		loop.classList.remove('short-vanish')
		HideShowCont()
		HideShowMainButtons()
		setTimeout(() => {
			loop.style.zIndex = '-1'
			showCont.innerHTML = ''
			video1.remove()
		}, 1500)
	} else {
		backButton.style.pointerEvents = 'none'
		InterpolateVideo(video2, video2, video3)
		HideShowCont()
		loop.style.zIndex = '-5'
		loop.classList.remove('short-vanish')
		loop.currentTime = 0
		loop.pause()
		video3.addEventListener('ended', () => {
			video3.classList.add('short-vanish')
			loop.play()
			HideShowMainButtons()
			setTimeout(() => {
				loop.style.zIndex = '-1'
				video1.remove()
				video2.remove()
				video3.remove()
				showCont.innerHTML = ''
			}, 1500)
		})
	}
}
function backButtonFunctionQuickS() {
	backButton.style.pointerEvents = 'none'
	HideShowCont()
	video2.classList.add('short-vanish')
	loop.play()
	loop.classList.remove('short-vanish')
	quickS = false
	setTimeout(() => {
		HideShowMainButtons()
		loop.style.zIndex = '-1'
		video2.remove()
		showCont.innerHTML = ''
	}, 300)
}

function createBackButton() {
	const centerContainerMade = document.createElement('div')
	centerContainerMade.classList.add('centerContainer')
	centerContainerMade.setAttribute('id', 'centerContainer_backButton')
	const buttonContainerMade = document.createElement('div')
	buttonContainerMade.classList.add('buttonContainer')
	buttonContainerMade.style.width = containVideoWidth + 'px'
	buttonContainerMade.style.height = containVideoHeight + 'px'
	backButton = document.createElement('button')
	let fontvar = `calc(5px + (24 - 5) * ((${
		containVideoWidth + 'px'
	} - 320px) / (1440 - 320)))`
	backButton.style.fontSize = fontvar
	backButton.classList.add('viewR_a')
	backButton.textContent = 'Back'
	backButtonContainer = document.createElement('div')
	backButtonContainer.classList.add('viewR_container')
	showCont.appendChild(centerContainerMade)
	centerContainerMade.append(buttonContainerMade)
	buttonContainerMade.appendChild(backButtonContainer)
	backButtonContainer.appendChild(backButton)
	if (quickS) {
		backButton.addEventListener('click', backButtonFunctionQuickS)
	} else {
		backButton.addEventListener('click', backButtonFunction)
	}
}

function ArreglarLineas() {
	for (let i = 0; i < svgContainer.length; i++) {
		svgContainer[i].style.width = containVideoWidth + 'px'
		svgContainer[i].style.height = containVideoHeight + 'px'
	}
	for (let i = 0; i < buttonContainer.length; i++) {
		buttonContainer[i].style.width = containVideoWidth + 'px'
		buttonContainer[i].style.height = containVideoHeight + 'px'
	}
	// mainButtons.style.opacity = '0'
	if (!mainButtons.classList.contains('disabled')) {
		mainButtons.classList.add('show')
	}
}

function getRenderedSize(contains, cWidth, cHeight, width, height, pos) {
	var oRatio = width / height,
		cRatio = cWidth / cHeight
	return function () {
		if (contains ? oRatio > cRatio : oRatio < cRatio) {
			this.width = cWidth
			this.height = cWidth / oRatio
		} else {
			this.width = cHeight * oRatio
			this.height = cHeight
		}
		this.left = (cWidth - this.width) * (pos / 100)
		this.right = this.width + this.left
		return this
	}.call({})
}

function getImgSizeInfo(img) {
	var pos = window
		.getComputedStyle(img)
		.getPropertyValue('object-position')
		.split(' ')
	return getRenderedSize(
		true,
		img.offsetWidth,
		img.offsetHeight,
		img.videoWidth,
		img.videoHeight,
		parseInt(pos[0])
	)
}

loop.addEventListener('loadedmetadata', function (e) {
	containVideoWidth = getImgSizeInfo(loop).width
	containVideoHeight = getImgSizeInfo(loop).height
	setFontSizes()
	ArreglarLineas()

	initial.classList.add('short-vanish')
	setTimeout(() => {
		initial.style.zIndex = '-200'
	}, 500)
})

if (loop.readyState >= 1) {
	setFontSizes()
	containVideoWidth = getImgSizeInfo(loop).width
	containVideoHeight = getImgSizeInfo(loop).height
	ArreglarLineas()

	initial.classList.add('short-vanish')
	setTimeout(() => {
		initial.style.zIndex = '-200'
	}, 500)
}

window.addEventListener('DOMContentLoaded', function () {
	setFontSizes()
	if (window.matchMedia('(max-width: 420px)').matches) {
		if (window.matchMedia('(orientation: portrait)').matches) {
			warningText.innerHTML =
				' Use the device in landscape mode in order to properly use this website'
			warning.style.opacity = '1'
			warning.style.zIndex = '300'
		}
	}
})

window.addEventListener('resize', function () {
	if (loop.readyState >= 1) {
		containVideoWidth = getImgSizeInfo(loop).width
		containVideoHeight = getImgSizeInfo(loop).height

		setFontSizes()

		if (!mainButtons.classList.contains('disabled')) {
			ArreglarLineas()
		}
	}
	if (window.matchMedia('(max-width: 420px)').matches) {
		if (window.matchMedia('(orientation: portrait)').matches) {
			warningText.innerHTML =
				' Use the device in landscape mode in order to properly use this website'
			warning.style.opacity = '1'
			warning.style.zIndex = '300'
		}
	} else {
		if (window.matchMedia('(orientation: landscape)').matches) {
			warning.style.opacity = '0'
			warning.style.zIndex = '-100'
			window.scrollTo(0, document.body.scrollHeight)
		}
	}
})

////////// Event Listeners for the main buttons //////////
fullscreen_button.addEventListener('click', function (e) {
	expand.classList.toggle('disabledb')
	contract.classList.toggle('disabledb')

	if (!document.fullscreenElement) {
		mainContainer.webkitRequestFullscreen()
	} else {
		document.exitFullscreen()
		document.webkitExitFullscreen()
	}
})

systemC_button.addEventListener('click', function (e) {
	HideShowMainButtons()
	createVideos(
		'assets/highRes/systemC1.mp4',
		'assets/highRes/systemC2.mp4',
		'assets/highRes/systemC3.mp4'
	)
	checkVideos()
	createBackButton()

	window.addEventListener('resize', function (e) {
		if (showCont.hasChildNodes()) {
			const backButtonContainer = document.querySelector(
				'#centerContainer_backButton'
			)

			backButtonContainer.remove()

			createBackButton()
		}
	})

	check1()

	let video1check = false
	let video2check = false
	let video3check = false

	function check1() {
		clearcheck = setInterval(repeatcheck, 500)
		function repeatcheck() {
			if (video1.readyState === 4) {
				video1check = true
			}
			if (video2.readyState === 4) {
				video2check = true
			}
			if (video3.readyState === 4) {
				video3check = true
			}
			setTimeout(() => {
				if (!video1check || !video2check || !video3check) {
					loader.style.zIndex = '200'
					loader.classList.add('show')
				}
			}, 1000)

			if (video1check && video2check && video3check) {
				loader.classList.remove('show')
				loader.classList.add('short-vanish')
				loader.style.zIndex = '-200'

				clearInterval(clearcheck)

				loop.classList.add('short-vanish')
				setTimeout(() => {
					video1.play()
					HideShowCont()
					video1.addEventListener('ended', () => {
						InterpolateVideo(loop, video1, video2)
					})
				}, 1500)
			}
		}
	}
})

startS_button.addEventListener('click', function (e) {
	HideShowMainButtons()
	createVideos(
		'assets/highRes/startS1.mp4',
		'assets/highRes/startS2.mp4',
		'assets/highRes/startS3.mp4'
	)
	checkVideos()
	createBackButton()

	window.addEventListener('resize', function (e) {
		if (showCont.hasChildNodes()) {
			const backButtonContainer = document.querySelector(
				'#centerContainer_backButton'
			)

			backButtonContainer.remove()

			createBackButton()
		}
	})

	check1()

	let video1check = false
	let video2check = false
	let video3check = false

	function check1() {
		clearcheck = setInterval(repeatcheck, 500)
		function repeatcheck() {
			if (video1.readyState === 4) {
				video1check = true
			}
			if (video2.readyState === 4) {
				video2check = true
			}
			if (video3.readyState === 4) {
				video3check = true
			}
			setTimeout(() => {
				if (!video1check || !video2check || !video3check) {
					loader.style.zIndex = '200'
					loader.classList.add('show')
				}
			}, 1000)

			if (video1check && video2check && video3check) {
				loader.classList.remove('show')
				loader.classList.add('short-vanish')
				loader.style.zIndex = '-200'

				clearInterval(clearcheck)

				loop.classList.add('short-vanish')
				setTimeout(() => {
					video1.play()
					HideShowCont()
					video1.addEventListener('ended', () => {
						InterpolateVideo(loop, video1, video2)
					})
				}, 1000)
			}
		}
	}
})

endS_button.addEventListener('click', function (e) {
	HideShowMainButtons()
	createVideos(
		'assets/highRes/endS1.mp4',
		'assets/highRes/endS2.mp4',
		'assets/highRes/endS3.mp4'
	)
	checkVideos()
	createBackButton()

	window.addEventListener('resize', function (e) {
		if (showCont.hasChildNodes()) {
			const backButtonContainer = document.querySelector(
				'#centerContainer_backButton'
			)

			backButtonContainer.remove()

			createBackButton()
		}
	})

	check1()
	let video1check = false
	let video2check = false
	let video3check = false

	function check1() {
		clearcheck = setInterval(repeatcheck, 500)
		function repeatcheck() {
			if (video1.readyState === 4) {
				video1check = true
			}
			if (video2.readyState === 4) {
				video2check = true
			}
			if (video3.readyState === 4) {
				video3check = true
			}
			setTimeout(() => {
				if (!video1check || !video2check || !video3check) {
					loader.style.zIndex = '200'
					loader.classList.add('show')
				}
			}, 1000)

			if (video1check && video2check && video3check) {
				loader.classList.remove('show')
				loader.classList.add('short-vanish')
				loader.style.zIndex = '-200'

				clearInterval(clearcheck)

				loop.classList.add('short-vanish')
				setTimeout(() => {
					video1.play()
					HideShowCont()
					video1.addEventListener('ended', () => {
						InterpolateVideo(loop, video1, video2)
					})
				}, 500)
			}
		}
	}
})

manualD_button.addEventListener('click', function (e) {
	HideShowMainButtons()
	createVideos(
		'assets/highRes/manualD1.mp4',
		'assets/highRes/manualD2.mp4',
		'assets/highRes/manualD3.mp4'
	)

	window.addEventListener('resize', function (e) {
		if (showCont.hasChildNodes()) {
			const backButtonContainer = document.querySelector(
				'#centerContainer_backButton'
			)

			backButtonContainer.remove()

			createBackButton()
		}
	})
	checkVideos()
	createBackButton()

	check1()
	let video1check = false
	let video2check = false
	let video3check = false

	function check1() {
		clearcheck = setInterval(repeatcheck, 500)
		function repeatcheck() {
			if (video1.readyState === 4) {
				video1check = true
			}
			if (video2.readyState === 4) {
				video2check = true
			}
			if (video3.readyState === 4) {
				video3check = true
			}
			setTimeout(() => {
				if (!video1check || !video2check || !video3check) {
					loader.style.zIndex = '200'
					loader.classList.add('show')
				}
			}, 1000)

			if (video1check && video2check && video3check) {
				loader.classList.remove('show')
				loader.classList.add('short-vanish')
				loader.style.zIndex = '-200'

				clearInterval(clearcheck)

				loop.classList.add('short-vanish')
				setTimeout(() => {
					video1.play()
					HideShowCont()
					video1.addEventListener('ended', () => {
						InterpolateVideo(loop, video1, video2)
					})
				}, 500)
			}
		}
	}
})

reports_button.addEventListener('click', function (e) {
	HideShowMainButtons()
	createVideos(
		'assets/highRes/reports1.mp4',
		'assets/highRes/reports2.mp4',
		'assets/highRes/reports3.mp4'
	)

	checkVideos()

	createBackButton()

	window.addEventListener('resize', function (e) {
		if (showCont.hasChildNodes()) {
			const backButtonContainer = document.querySelector(
				'#centerContainer_backButton'
			)

			backButtonContainer.remove()

			createBackButton()
		}
	})

	check1()
	let video1check = false
	let video2check = false
	let video3check = false

	function check1() {
		clearcheck = setInterval(repeatcheck, 500)

		function repeatcheck() {
			if (video1.readyState === 4) {
				video1check = true
			}
			if (video2.readyState === 4) {
				video2check = true
			}
			if (video3.readyState === 4) {
				video3check = true
			}
			setTimeout(() => {
				if (!video1check || !video2check || !video3check) {
					loader.style.zIndex = '200'
					loader.classList.add('show')
				}
			}, 1000)

			if (video1check && video2check && video3check) {
				loader.classList.remove('show')
				loader.classList.add('short-vanish')
				loader.style.zIndex = '-200'

				clearInterval(clearcheck)

				loop.classList.add('short-vanish')
				setTimeout(() => {
					video1.play()
					HideShowCont()
					video1.addEventListener('ended', () => {
						InterpolateVideo(loop, video1, video2)
						// HideShowCont()
					})
				}, 1000)
			}
		}
	}
})

casseteR_button.addEventListener('click', function (e) {
	HideShowMainButtons()
	createVideos(
		'assets/highRes/casseteR1.mp4',
		'assets/highRes/casseteR2.mp4',
		'assets/highRes/casseteR3.mp4'
	)
	checkVideos()
	createBackButton()

	window.addEventListener('resize', function (e) {
		if (showCont.hasChildNodes()) {
			const backButtonContainer = document.querySelector(
				'#centerContainer_backButton'
			)

			backButtonContainer.remove()

			createBackButton()
		}
	})

	check1()
	let video1check = false
	let video2check = false
	let video3check = false

	function check1() {
		clearcheck = setInterval(repeatcheck, 500)

		function repeatcheck() {
			if (video1.readyState === 4) {
				video1check = true
			}
			if (video2.readyState === 4) {
				video2check = true
			}
			if (video3.readyState === 4) {
				video3check = true
			}
			setTimeout(() => {
				if (!video1check || !video2check || !video3check) {
					loader.style.zIndex = '200'
					loader.classList.add('show')
				}
			}, 1000)

			if (video1check && video2check && video3check) {
				loader.classList.remove('show')
				loader.classList.add('short-vanish')
				loader.style.zIndex = '-200'

				clearInterval(clearcheck)

				loop.classList.add('short-vanish')
				setTimeout(() => {
					video1.play()
					HideShowCont()
					video1.addEventListener('ended', () => {
						InterpolateVideo(loop, video1, video2)
					})
				}, 1000)
			}
		}
	}
})

coinH_button.addEventListener('click', function (e) {
	HideShowMainButtons()
	createVideos(
		'assets/highRes/coinH1.mp4',
		'assets/highRes/coinH2.mp4',
		'assets/highRes/coinH3.mp4'
	)
	checkVideos()
	createBackButton()

	window.addEventListener('resize', function (e) {
		if (showCont.hasChildNodes()) {
			const backButtonContainer = document.querySelector(
				'#centerContainer_backButton'
			)

			backButtonContainer.remove()

			createBackButton()
		}
	})

	check1()
	let video1check = false
	let video2check = false
	let video3check = false

	function check1() {
		clearcheck = setInterval(repeatcheck, 500)

		function repeatcheck() {
			if (video1.readyState === 4) {
				video1check = true
			}
			if (video2.readyState === 4) {
				video2check = true
			}
			if (video3.readyState === 4) {
				video3check = true
			}
			setTimeout(() => {
				if (!video1check || !video2check || !video3check) {
					loader.style.zIndex = '200'
					loader.classList.add('show')
				}
			}, 1000)

			if (video1check && video2check && video3check) {
				loader.classList.remove('show')
				loader.classList.add('short-vanish')
				loader.style.zIndex = '-200'

				clearInterval(clearcheck)

				loop.classList.add('short-vanish')
				setTimeout(() => {
					video1.play()
					HideShowCont()
					video1.addEventListener('ended', () => {
						InterpolateVideo(loop, video1, video2)
					})
				}, 1000)
			}
		}
	}
})

three_button.addEventListener('click', function (e) {
	HideShowMainButtons()
	createVideos(
		'assets/highRes/three1.mp4',
		'assets/highRes/three2.mp4',
		'assets/highRes/three3.mp4'
	)
	checkVideos()
	createBackButton()

	window.addEventListener('resize', function (e) {
		if (showCont.hasChildNodes()) {
			const backButtonContainer = document.querySelector(
				'#centerContainer_backButton'
			)

			backButtonContainer.remove()

			createBackButton()
		}
	})

	check1()
	let video1check = false
	let video2check = false
	let video3check = false

	function check1() {
		clearcheck = setInterval(repeatcheck, 500)

		function repeatcheck() {
			if (video1.readyState === 4) {
				video1check = true
			}
			if (video2.readyState === 4) {
				video2check = true
			}
			if (video3.readyState === 4) {
				video3check = true
			}
			setTimeout(() => {
				if (!video1check || !video2check || !video3check) {
					loader.style.zIndex = '200'
					loader.classList.add('show')
				}
			}, 1000)

			if (video1check && video2check && video3check) {
				loader.classList.remove('show')
				loader.classList.add('short-vanish')
				loader.style.zIndex = '-200'

				clearInterval(clearcheck)

				loop.classList.add('short-vanish')
				setTimeout(() => {
					video1.play()
					HideShowCont()
					video1.addEventListener('ended', () => {
						InterpolateVideo(loop, video1, video2)
					})
				}, 1000)
			}
		}
	}
})

close.addEventListener('click', function (e) {
	modalalert.style.pointerEvents = 'none'
	modalalert.style.transform = 'scale(0)'
	alertdiv.style.opacity = 0
	alertdiv.style.pointerEvents = 'none'
})
