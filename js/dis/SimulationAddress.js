/**
 * Section 5.2.14.1. A Simulation Address  record shall consist of the Site Identification number and the Application Identification number.
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.SimulationAddress = function()
{
   /** The site ID */
   this.site = 0;

   /** The application ID */
   this.application = 0;

  this.initFromBinaryDIS = function(inputStream)
  {

       this.site = inputStream.readUShort();
       this.application = inputStream.readUShort();
  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       outputStream.writeUShort(this.site);
       outputStream.writeUShort(this.application);
};
}; // end of class
