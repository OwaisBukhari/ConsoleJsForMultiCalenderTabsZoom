// ==UserScript==
// @name         Google Calendar Per-Window Zoom with Centered Dialog
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Adds zoom buttons to adjust Google Calendar per window and centers the dialog when a specific button is clicked
// @author       You
// @match        https://calendar.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Define zoom levels
    const zoomLevels = [1, 1.5, 2];
    let currentZoomIndex = 0;

    // Function to update zoom
    function updateZoom() {
        const newZoom = zoomLevels[currentZoomIndex];
        document.body.style.zoom = newZoom;
    }

    // Function to zoom in
    function zoomIn() {
        if (currentZoomIndex < zoomLevels.length - 1) {
            currentZoomIndex++;
            updateZoom();
            adjustDivPosition(); // Call the function to adjust the div position
        }
    }

    // Function to zoom out
    function zoomOut() {
        if (currentZoomIndex > 0) {
            currentZoomIndex--;
            updateZoom();
            adjustDivPosition(); // Call the function to adjust the div position
        }
    }

    // Function to center the div on the page
    function centerDiv() {
        const divToCenter = document.querySelector('.RDlrG.Inn9w.iWO5td');

        if (divToCenter) {
            // Calculate the center of the window
            const centerX = window.innerWidth / 2 - divToCenter.offsetWidth / 2;
            const centerY = window.innerHeight / 2 - divToCenter.offsetHeight / 2;

            // Set the div's position
            divToCenter.style.position = 'absolute';
            // divToCenter.style.width = '0'; // Uncomment if needed
            // divToCenter.style.height = '0'; // Uncomment if needed
            divToCenter.style.top = '70px'; // Adjust the top position as needed
            divToCenter.style.left = '-500px'; // Adjust the left position as needed
            divToCenter.style.opacity = '1';
            divToCenter.style.transform = 'none';
            // SET VISIVILITY TO HIDDEN?
            //  divToCenter.style.visibility = 'hidden';
        }
    }
    function isDivVisible() {
        const divToCheck = document.querySelector('[role="button"]');
        return divToCheck && divToCheck.offsetParent !== null;
    }
    
    // Create a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver(function (mutations) {
        if (isDivVisible()) {
            // Call centerDiv when the div becomes visible
            centerDiv();
        }
    });
    
    // Configure the observer to listen for changes to the entire document's subtree
    const observerConfig = { subtree: true, childList: true };
    
    // Start observing the document
    observer.observe(document, observerConfig);

    // Function to adjust the position of the div
    function adjustDivPosition() {
        const dialogDiv = document.querySelector('.RDlrG');
        if (dialogDiv) {
            // Adjust the position as needed
            dialogDiv.style.position = 'fixed';
            dialogDiv.style.top = '50%';
            dialogDiv.style.left = '50%';
            dialogDiv.style.transform = 'translate(-50%, -50%)';
            dialogDiv.style.zIndex = '1000'; // Adjust the z-index as needed
        }
    }

    // Create "Zoom In" button
    const zoomInButton = document.createElement('button');
    zoomInButton.textContent = 'Zoom In';
    zoomInButton.style.position = 'fixed';
    zoomInButton.style.top = '60px'; // Adjust the position as needed
    zoomInButton.style.right = '100px';
    zoomInButton.style.zIndex = '1000';
    zoomInButton.addEventListener('click', zoomIn);

    // Create "Zoom Out" button
    const zoomOutButton = document.createElement('button');
    zoomOutButton.textContent = 'Zoom Out';
    zoomOutButton.style.position = 'fixed';
    zoomOutButton.style.top = '60px'; // Adjust the position as needed
    zoomOutButton.style.right = '20px';
    zoomOutButton.style.zIndex = '1000';
    zoomOutButton.addEventListener('click', zoomOut);

    // Find the header element and append the buttons
  const header = document.querySelector('header.gb_Pa');
    if (header) {
        header.appendChild(zoomInButton);
        header.appendChild(zoomOutButton);
    } else {
        console.error('Header element not found. Please adjust the selector.');
    }

    // Listen for the click event on the specific button
    // document.addEventListener('click', function (event) {
    // if (event.target.getAttribute('role') === 'button') {
    //         // Code to show/hide the div goes here

    //         // Center the div when it appears
    //         centerDiv();
    //     }
    // });
})();
