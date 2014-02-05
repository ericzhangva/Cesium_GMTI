/**
 * 5.2.3: location of the radiating portion of the antenna, specified in world coordinates and         entity coordinates.
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.AntennaLocation = function()
{
   /** Location of the radiating portion of the antenna in world    coordinates */
   this.antennaLocation = new dis.Vector3Double(); 

   /** Location of the radiating portion of the antenna     in entity coordinates */
   this.relativeAntennaLocation = new dis.Vector3Float(); 

  this.initFromBinaryDIS = function(inputStream)
  {

       this.antennaLocation.initFromBinaryDIS(inputStream);
       this.relativeAntennaLocation.initFromBinaryDIS(inputStream);
  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       this.antennaLocation.encodeToBinaryDIS(outputStream);
       this.relativeAntennaLocation.encodeToBinaryDIS(outputStream);
};
}; // end of class
